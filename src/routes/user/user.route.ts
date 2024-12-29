import { Hono } from "hono";
import { verifyAuth } from "../../middlewares/verifyAuth";
import { db } from "../../db";
import { users as usersTable } from "../../db/schema/user";
import { and, eq, like, ne } from "drizzle-orm";
import { z } from "zod";
import { editProfileSchema } from "../../validation/schemas";
import { v2 } from "cloudinary";

const userRouter = new Hono();

userRouter.get("/my-profile", verifyAuth, async (c) => {
  try {
    const userId = c.get("userId" as any) as number;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    if (!user) {
      return c.json({ success: false, message: "User not found" }, 404);
    }

    return c.json(
      {
        success: true,
        user: {
          id: user.id,
          firstName: user.firstName,
          secondName: user.secondName,
          username: user.username,
          email: user.email,
          imageUrl: user.imageUrl,
        },
      },
      200
    );
  } catch (error) {
    return c.json({ success: false, message: "Internal server error" });
  }
});

userRouter.get("/profile/:username", verifyAuth, async (c) => {
  try {
    const username = c.req.param("username");

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));

    if (!user) {
      return c.json({ success: false, message: "User not found" }, 404);
    }

    return c.json(
      {
        success: true,
        user: {
          id: user.id,
          firstName: user.firstName,
          secondName: user.secondName,
          username: user.username,
          email: user.email,
          imageUrl: user.imageUrl,
        },
      },
      200
    );
  } catch (error) {
    return c.json({ success: false, message: "Internal server error" });
  }
});

userRouter.get("/search/:username", verifyAuth, async (c) => {
  try {
    const username = c.req.param("username");
    const userId = c.get("userId" as any) as number;

    const users = await db
      .select()
      .from(usersTable)
      .where(
        and(
          like(usersTable.username, `%${username}%`),
          ne(usersTable.id, userId)
        )
      );

    if (users.length === 0) {
      return c.json({ success: false, message: "No users found" }, 404);
    }

    return c.json(
      {
        success: true,
        users: users.map((user) => ({
          id: user.id,
          firstName: user.firstName,
          secondName: user.secondName,
          username: user.username,
          email: user.email,
          imageUrl: user.imageUrl,
        })),
      },
      200
    );
  } catch (error) {
    return c.json({ success: false, message: "Internal server error" });
  }
});

export default userRouter;

userRouter.put("/edit", verifyAuth, async (c) => {
  try {
    const data = await c.req.json();
    const editData = editProfileSchema.parse(data);
    const userId = c.get("userId" as any) as number;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    if (!user) {
      return c.json({ success: false, message: "User not found" }, 404);
    }

    if (editData.image) {
      const { secure_url } = await v2.uploader.upload(editData.image);
      editData.image = secure_url;
    }

    const [updatedUser] = await db
      .update(usersTable)
      .set({
        firstName: editData.firstName || user.firstName,
        secondName: editData.secondName || user.firstName,
        username: editData.username || user.username,
        imageUrl: editData.image || user.imageUrl,
      })
      .where(eq(usersTable.id, userId))
      .returning();

    return c.json({
      success: true,
      message: "User updated successfully",
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        secondName: updatedUser.secondName,
        username: updatedUser.username,
        email: updatedUser.email,
        imageUrl: updatedUser.imageUrl,
      },
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
