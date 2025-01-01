import { Hono } from "hono";
import { verifyAuth } from "../../middlewares/verifyAuth";
import { z } from "zod";
import { createMessageSchema } from "../../validation/schemas";
import { db } from "../../db";
import { users as usersTable } from "../../db/schema/user";
import { messages as messageTable } from "../../db/schema/message";
import { contacts as contactsTable } from "../../db/schema/contact";
import { and, eq } from "drizzle-orm";

const messagesRouter = new Hono();

messagesRouter.post("/send-message", verifyAuth, async (c) => {
  try {
    const data = await c.req.json();
    const messageData = createMessageSchema.parse(data);
    const userId = c.get("userId" as any) as number;

    if (userId === messageData.receiverId) {
      return c.json(
        { success: false, message: "You cannot send message to yourself" },
        401
      );
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    const [inContacts] = await db
      .select()
      .from(contactsTable)
      .where(
        and(
          eq(contactsTable.userId, userId),
          eq(contactsTable.contactId, messageData.receiverId)
        )
      );

    if (!inContacts) {
      return c.json(
        { success: false, message: "User is not in your contacts" },
        401
      );
    }

    if (!user) {
      return c.json({ success: false, message: "User not found" }, 404);
    }

    const newMessage = await db
      .insert(messageTable)
      .values({
        senderId: userId,
        receiverId: messageData.receiverId,
        content: messageData.content,
      })
      .returning();

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
    return c.json({ success: false, message: "Internal server error" });
  }
});

export default messagesRouter;
