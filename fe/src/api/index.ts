"use client";
import axios, { AxiosInstance } from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

class Api {
  client: AxiosInstance;
  projectId: number | undefined;

  constructor(token?: string) {
    this.client = axios.create({
      baseURL: url,
    });

    if (token) {
      this.setToken(token);
    }
  }

  setToken(token: string) {
    this.client.defaults.headers.common = {
      Authorization: "Bearer " + token,
    };
  }

  setProjectId(projectId: number) {
    this.projectId = projectId;
  }

  requireProjectId() {
    if (!this.projectId) {
      throw new Error("you need set the project id first");
    }
  }

  async loginWithGithub(code: string, identity: number) {
    const { data } = await this.client.post("/login/github", {
      code,
      identity,
    });

    return data;
  }

  async listProject() {
    return (await this.client.get("/projects")).data;
  }

  async getProjectModule() {
    this.requireProjectId();
    return (await this.client.get(`/projects/${this.projectId}/modules`)).data;
  }

  async getModuleCode(filename: string) {
    this.requireProjectId();
    return (
      await this.client.get(
        `/projects/${this.projectId}/module/${filename}/code`,
      )
    ).data;
  }
}

const api = new Api();
if (typeof window !== "undefined") {
  api.setToken(localStorage.getItem("token") as string);
}

export { api };
