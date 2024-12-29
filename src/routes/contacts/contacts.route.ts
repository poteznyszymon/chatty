import { Hono } from "hono";
import { verifyAuth } from "../../middlewares/verifyAuth";
import { z } from "zod";
import { createContactSchema } from "../../validation/schemas";
import { db } from "../../db";
import { users as usersTable } from "../../db/schema/user";
import { eq } from "drizzle-orm";
import { contacts as contactsTable } from "../../db/schema/contact";

export const contactsRouter = new Hono();

contactsRouter.post("/", verifyAuth, async (c) => {
  try {
    const data = await c.req.json();
    const userId = c.get("userId" as any) as number;
    const { contactId } = createContactSchema.parse(data);

    const [contactUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, contactId));

    const [currentUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    if (!contactUser || !currentUser) {
      return c.json({ success: false, message: "User not found" }, 404);
    }

    await db.insert(contactsTable).values({
      userId,
      contactId,
    });

    return c.json({
      success: true,
      user: contactUser,
      message: "User added successfully to contacts",
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
        400
      );
    }
    return c.json({
      success: false,
      message: "Internal server error",
    });
  }
});

contactsRouter.delete("/", verifyAuth, async (c) => {
  try {
    const data = await c.req.json();
    const userId = c.get("userId" as any) as number;
    const { contactId } = createContactSchema.parse(data);

    const [contactUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, contactId));

    const [currentUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    if (!contactUser || !currentUser) {
      return c.json({ success: false, message: "User not found" }, 404);
    }

    await db.insert(contactsTable).values({
      userId,
      contactId,
    });

    await db
      .delete(contactsTable)
      .where(
        eq(contactsTable.userId, userId) &&
          eq(contactsTable.contactId, contactId)
      );

    return c.json({
      success: true,
      user: contactUser,
      message: "User deleted successfully from contacts",
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
        400
      );
    }
    return c.json({
      success: false,
      message: "Internal server error",
    });
  }
});

contactsRouter.get("/", verifyAuth, async (c) => {
  try {
    const userId = c.get("userId" as any) as number;

    const contacts = await db
      .select({
        id: usersTable.id,
        username: usersTable.username,
        email: usersTable.email,
        lastActive: usersTable.lastActive,
        imageUrl: usersTable.imageUrl,
      })
      .from(contactsTable)
      .fullJoin(usersTable, eq(contactsTable.contactId, usersTable.id))
      .where(eq(contactsTable.userId, userId));

    return c.json({ success: true, contacts });
  } catch (error) {
    console.log(error);
    return c.json(
      {
        success: false,
        message: "Internal server error",
      },
      500
    );
  }
});
