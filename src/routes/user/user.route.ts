import { Hono } from "hono";
import { verifyAuth } from "../../middlewares/verifyAuth";
import { db } from "../../db";
import { users as usersTable } from "../../db/schema/user";
import { and, eq, like, ne } from "drizzle-orm";

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
        })),
      },
      200
    );
  } catch (error) {
    return c.json({ success: false, message: "Internal server error" });
  }
});

export default userRouter;
