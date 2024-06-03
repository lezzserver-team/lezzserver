import { api } from "@/lib/api";
import type { AxiosInstance } from "axios";
import type { AuthEntity, LoginDto, LoginGithubDto, RegisterDto } from "./types";

class AuthApi {
  api: AxiosInstance = api;

  async loginGithub(values: LoginGithubDto): Promise<AuthEntity> {
    const { data } = await this.api.post<AuthEntity>("/auth/login/github", values);

    return data;
  }

  async login(values: LoginDto) :Promise<AuthEntity> {
    const { data } = await this.api.post<AuthEntity>("/auth/login", values)

    return data
  }

  async register(values: RegisterDto): Promise<AuthEntity> {
    const { data } = await this.api.post<AuthEntity>("/auth/register", values)

    return data
  }

  async logout(): Promise<AuthEntity> {
    const { data } = await this.api.post<AuthEntity>("/logout");

    return data;
  }
}

export const authApi = new AuthApi();
