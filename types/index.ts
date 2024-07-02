import { z } from "zod"

export const SignUpformSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email().min(5),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password did not matched",
    path: ["confirmPassword"],
  });

  export const SignInformSchema = z.object({
    email: z.string().email().min(5),
    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  });