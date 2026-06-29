export type SerialLogHandler = (line: string) => void;
export type SerialStatusHandler = (status: "idle" | "unsupported" | "requesting" | "connected" | "reading" | "closed" | "error") => void;

type WebSerialPort = {
  readable: ReadableStream<Uint8Array> | null;
  writable: WritableStream<Uint8Array> | null;
  open(options: { baudRate: number }): Promise<void>;
  close(): Promise<void>;
};

type SerialNavigator = Navigator & {
  serial?: {
    requestPort(): Promise<WebSerialPort>;
    getPorts(): Promise<WebSerialPort[]>;
  };
};

export class WebSerialConnection {
  private port: WebSerialPort | null = null;
  private reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  private keepReading = false;

  constructor(
    private readonly onLog: SerialLogHandler,
    private readonly onStatus: SerialStatusHandler
  ) {}

  isSupported() {
    return typeof navigator !== "undefined" && Boolean((navigator as SerialNavigator).serial);
  }

  async connect(baudRate = 115200) {
    const serial = (navigator as SerialNavigator).serial;
    if (!serial) {
      this.onStatus("unsupported");
      throw new Error("Web Serial is not supported in this browser. Use Chrome or Edge on desktop.");
    }

    this.onStatus("requesting");
    this.port = await serial.requestPort();
    await this.port.open({ baudRate });
    this.keepReading = true;
    this.onStatus("connected");
    void this.readLoop();
  }

  async disconnect() {
    this.keepReading = false;
    try {
      await this.reader?.cancel();
      this.reader?.releaseLock();
    } finally {
      this.reader = null;
    }

    if (this.port) {
      await this.port.close();
      this.port = null;
    }
    this.onStatus("closed");
  }

  async write(text: string) {
    if (!this.port?.writable) throw new Error("Serial port is not writable.");
    const writer = this.port.writable.getWriter();
    try {
      await writer.write(new TextEncoder().encode(text));
    } finally {
      writer.releaseLock();
    }
  }

  private async readLoop() {
    if (!this.port?.readable) return;
    this.onStatus("reading");
    const decoder = new TextDecoder();
    let buffer = "";

    while (this.keepReading && this.port.readable) {
      this.reader = this.port.readable.getReader();
      try {
        while (this.keepReading) {
          const { value, done } = await this.reader.read();
          if (done) break;
          if (!value) continue;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split(/\r?\n/);
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (line.trim()) this.onLog(line);
          }
        }
      } catch (error) {
        this.onStatus("error");
        this.onLog(`[serial:error] ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        this.reader.releaseLock();
        this.reader = null;
      }
    }
  }
}
