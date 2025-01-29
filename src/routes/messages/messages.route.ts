import { Hono } from "hono";
import { verifyAuth } from "../../middlewares/verifyAuth";
import { z } from "zod";
import { createMessageSchema } from "../../validation/schemas";
import { db } from "../../db";
import { users as usersTable } from "../../db/schema/user";
import { messages as messageTable } from "../../db/schema/message";
import { contacts as contactsTable } from "../../db/schema/contact";
import { and, eq, or } from "drizzle-orm";
import { io } from "../../websocket/socket";
import { v2 } from "cloudinary";

const messagesRouter = new Hono();

messagesRouter.post("/send-message", verifyAuth, async (c) => {
  try {
    const data = await c.req.json();
    const messageData = createMessageSchema.parse(data);
    const userId = c.get("userId" as any) as number;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    const [receiver] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, messageData.username));

    if (!user || !receiver) {
      return c.json({ success: false, message: "User not found" }, 404);
    }

    if (Number(userId) === receiver.id) {
      return c.json(
        { success: false, message: "You cannot send message to yourself" },
        401
      );
    }

    const [inContacts] = await db
      .select()
      .from(contactsTable)
      .where(eq(contactsTable.userId, userId));

    if (!inContacts) {
      return c.json(
        { success: false, message: "User is not in your contacts" },
        401
      );
    }

    if (messageData.image) {
      const { secure_url } = await v2.uploader.upload(messageData.image);
      messageData.image = secure_url;
    }

    const [newMessage] = await db
      .insert(messageTable)
      .values({
        senderId: userId,
        receiverId: receiver.id,
        content: messageData.content ? messageData.content : "",
        image: messageData.image ? messageData.image : "",
      })
      .returning();

    io.emit(`${receiver.username}`, {
      senderUsername: user.username,
      message: newMessage,
    });

    return c.json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        500
      );
    }
    return c.json({ success: false, message: "Internal server error" }, 500);
  }
});

messagesRouter.get("/get-messages/:username", verifyAuth, async (c) => {
  const userId = c.get("userId" as any) as number;
  const username = c.req.param("username");

  const [receiver] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username));

  if (!receiver) {
    return c.json({ success: false, message: "User not found" }, 404);
  }

  const messages = await db
    .select()
    .from(messageTable)
    .where(
      or(
        and(
          eq(messageTable.senderId, userId),
          eq(messageTable.receiverId, receiver.id)
        ),
        and(
          eq(messageTable.senderId, receiver.id),
          eq(messageTable.receiverId, userId)
        )
      )
    )
    .orderBy(messageTable.sentAt);

  return c.json({ success: true, messages: messages });
});

export default messagesRouter;
