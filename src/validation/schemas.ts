import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name cannot be empty" })
    .max(50, { message: "First name must be shorter than 50 characters" }),
  secondName: z
    .string()
    .min(1, { message: "Second name cannot be empty" })
    .max(50, { message: "Second name must be shorter than 50 characters" }),
  email: z.string().email({ message: "Wrong email format" }),
  username: z
    .string()
    .min(6, { message: "Username must be at lest 6 characters long." })
    .max(20, { message: "Username must be shorter than 20 characters" }),
  password: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Wrong email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type loginValues = z.infer<typeof loginSchema>;
export type registerValues = z.infer<typeof registerSchema>;

export const createContactSchema = z.object({
  contactId: z.number(),
});
