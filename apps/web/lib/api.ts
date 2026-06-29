export const LUMIFORGE_API_URL =
  process.env.NEXT_PUBLIC_LUMIFORGE_API_URL ?? "http://localhost:8787";

export async function apiPost<TResponse>(path: string, body: unknown): Promise<TResponse> {
  const response = await fetch(`${LUMIFORGE_API_URL}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${text}`);
  }

  return response.json() as Promise<TResponse>;
}
