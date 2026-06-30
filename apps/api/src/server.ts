import cors from "@fastify/cors";
import Fastify from "fastify";
import { registerAiNativeRoutes } from "./ai-native-routes";
import { registerRoutes } from "./routes";

const app = Fastify({ logger: true });
await app.register(cors, { origin: true });
await registerAiNativeRoutes(app);
await registerRoutes(app);

const port = Number(process.env.LUMIFORGE_API_PORT ?? 8787);
const host = process.env.LUMIFORGE_API_HOST ?? "0.0.0.0";

try {
  await app.listen({ port, host });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
