import { Hono } from "hono";

import { env } from "./utils/config";
import registerRouter from "./routes/auth/register.route";
import loginRouter from "./routes/auth/login.route";
import logoutRouter from "./routes/auth/logout.route";
import userRouter from "./routes/user/user.route";
import messagesRouter from "./routes/messages/messages.route";
import contactsRouter from "./routes/contacts/contacts.route";

import { v2 } from "cloudinary";

import { httpServer } from "./websocket/socket";

v2.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_SECRET,
});

const app = new Hono();

app
  .basePath("/api")
  .route("/", registerRouter)
  .route("/", loginRouter)
  .route("/", logoutRouter)
  .route("/", userRouter)
  .route("/messages", messagesRouter)
  .route("/contacts", contactsRouter);

const server = Bun.serve({
  port: env.PORT,
  fetch: app.fetch,
});

httpServer.listen(env.CHAT_PORT, () => {
  console.log(`Websocket server running on PORT: ${env.CHAT_PORT}`);
});

console.log(`Rest api server running on PORT: ${server.port}`);
