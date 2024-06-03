import { z } from "zod";

export const registerFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;

