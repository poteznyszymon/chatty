import { Hono } from "hono";

import { env } from "./utils/config";
import registerRouter from "./routes/auth/register.route";
import loginRouter from "./routes/auth/login.route";
import logoutRouter from "./routes/auth/logout.route";
import myProfileRouter from "./routes/user/myProfile.route";
import { contactsRouter } from "./routes/user/contacts.route";

import { httpServer } from "./websocket/socket";

const app = new Hono();

app
  .basePath("/api")
  .route("/", registerRouter)
  .route("/", loginRouter)
  .route("/", logoutRouter)
  .route("/", myProfileRouter)
  .route("/contacts", contactsRouter);

const server = Bun.serve({
  port: env.PORT,
  fetch: app.fetch,
});

httpServer.listen(env.CHAT_PORT, () => {
  console.log(`Websocket server running on PORT: ${env.CHAT_PORT}`);
});

console.log(`Rest api server running on PORT: ${server.port}`);
