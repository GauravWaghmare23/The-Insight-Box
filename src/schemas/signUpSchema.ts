import { z } from "zod";

export const userValidation = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must be less than 20 characters")
  .regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers");

export const signUpSchema = z.object({
  username: userValidation,
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
