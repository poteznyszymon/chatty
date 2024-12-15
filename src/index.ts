import { Hono } from "hono";

const app = new Hono();

const server = Bun.serve({
  port: process.env.PORT,
  fetch: app.fetch,
});

console.log(`Server running on PORT: ${server.port}`);
