import { z } from "zod";

export const editProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name cannot be empty" })
    .max(50, { message: "First name must be shorter than 50 characters" }),
  secondName: z
    .string()
    .min(1, { message: "Second name cannot be empty" })
    .max(50, { message: "Second name must be shorter than 50 characters" }),
  username: z
    .string()
    .min(6, { message: "Username must be at lest 6 characters long." })
    .max(20, { message: "Username must be shorter than 20 characters" })
    .regex(/^[a-z0-9]+$/i, {
      message: "Username can only contain letters and numbers",
    }),
});

export type editProfileValues = z.infer<typeof editProfileSchema>;
