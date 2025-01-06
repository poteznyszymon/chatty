import { Hono } from "hono";
import { verifyAuth } from "../../middlewares/verifyAuth";
import { z } from "zod";
import { createContactSchema } from "../../validation/schemas";
import { db } from "../../db";
import { users as usersTable } from "../../db/schema/user";
import { and, eq } from "drizzle-orm";
import { contacts as contactsTable } from "../../db/schema/contact";

const contactsRouter = new Hono();

contactsRouter.post("/add-contact", verifyAuth, async (c) => {
  try {
    const data = await c.req.json();
    const userId = c.get("userId" as any) as number;
    const { contactId } = createContactSchema.parse(data);

    if (Number(userId) === contactId) {
      return c.json(
        {
          success: false,
          message: "You can't send contact request to yourself",
        },
        400
      );
    }

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

    const [alreadySent] = await db
      .select()
      .from(contactsTable)
      .where(
        and(
          eq(contactsTable.userId, userId),
          eq(contactsTable.contactId, contactId)
        )
      );

    if (alreadySent) {
      return c.json(
        { success: false, message: "Contact request already sent" },
        400
      );
    }

    await db.insert(contactsTable).values({
      userId,
      contactId,
    });

    return c.json({
      success: true,
      user: contactUser,
      message: `Contact request sent to user with id: ${contactId}`,
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

contactsRouter.get("/get-contacts", verifyAuth, async (c) => {
  try {
    const userId = c.get("userId" as any) as number;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    if (!user) {
      return c.json({ success: false, message: "User not found" }, 404);
    }

    const contacts = await db
      .select({
        id: usersTable.id,
        username: usersTable.username,
        email: usersTable.email,
        lastActive: usersTable.lastActive,
        imageUrl: usersTable.imageUrl,
      })
      .from(contactsTable)
      .innerJoin(
        usersTable,
        and(
          eq(contactsTable.contactId, usersTable.id),
          eq(contactsTable.confirmed, true)
        )
      )
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

contactsRouter.get("/get-contacts-requests", verifyAuth, async (c) => {
  try {
    const userId = c.get("userId" as any) as number;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    if (!user) {
      return c.json({ success: false, message: "User not found" }, 404);
    }

    const contactsRequests = await db
      .select({
        id: usersTable.id,
        username: usersTable.username,
        email: usersTable.email,
        lastActive: usersTable.lastActive,
        imageUrl: usersTable.imageUrl,
      })
      .from(contactsTable)
      .innerJoin(usersTable, eq(usersTable.id, contactsTable.contactId))
      .where(
        and(
          eq(contactsTable.userId, userId),
          eq(contactsTable.confirmed, false)
        )
      );

    return c.json({ success: true, contactsRequests });
  } catch (error) {
    return c.json({ success: false, message: "Internal server error" }, 500);
  }
});

contactsRouter.put("/verify-contact/:id", verifyAuth, async (c) => {
  try {
    const requestId = c.req.param("id");
    const userId = c.get("userId" as any) as number;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    if (!user) {
      return c.json({ success: false, message: "User not found" }, 404);
    }

    const [updatedContact] = await db
      .update(contactsTable)
      .set({ confirmed: true })
      .where(eq(contactsTable.id, Number(requestId)))
      .returning();

    const [newContact] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, updatedContact.contactId));

    await db.insert(contactsTable).values({
      userId: newContact.id,
      contactId: userId,
      confirmed: true,
    });

    return c.json({ success: true, newContact: newContact });
  } catch (error) {
    c.json({ success: false, message: "Internal server error" });
  }
});

export default contactsRouter;
