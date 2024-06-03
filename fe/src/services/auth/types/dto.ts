import { LoginFormSchema, LoginGithubFormSchema } from "@/features/login/utils/validators";
import { RegisterFormSchema } from '@/features/register/validators/index'

export type LoginDto = LoginFormSchema & {
  identity: string
};

export type LoginGithubDto = LoginGithubFormSchema;
export type RegisterDto = RegisterFormSchema;
