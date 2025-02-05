import { Hono } from "hono";
import { deleteCookie } from "hono/cookie";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import { users as usersTable } from "../../db/schema/user";
import { verifyAuth } from "../../middlewares/verifyAuth";


const logoutRouter = new Hono();

logoutRouter.post("/logout", verifyAuth, async (c) => {
  try {
    deleteCookie(c, "access_token");
    deleteCookie(c, "refresh_token");

    const userId = c.get("userId" as any) as number;

    await db.update(usersTable).set({lastActive: new Date()}).where(eq(usersTable.id, userId));
    
    return c.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    return c.json({ success: false, message: "Internal server error" }, 500);
  }
});

export default logoutRouter;
