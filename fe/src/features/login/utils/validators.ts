import { z } from "zod";

export const LoginGithubFormSchema = z.object({
  code: z.string(),
  identity: z.string(),
});

export const LoginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export type LoginGithubFormSchema = z.infer<typeof LoginGithubFormSchema>;
export type LoginFormSchema = z.infer<typeof LoginFormSchema>;
