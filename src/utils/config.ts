import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), { message: "PORT must be a number" })
    .default("3000"),
  CHAT_PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), { message: "PORT must be a number" })
    .default("4000"),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_SECRET: z.string(),
  CLOUDINARY_API_KEY: z.string(),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  CHAT_PORT: process.env.CHAT_PORT,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
});
