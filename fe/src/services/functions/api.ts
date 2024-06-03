import { api } from "@/lib/api";
import type { AxiosInstance } from "axios";

class RunFunctionApi {
  api: AxiosInstance = api;

  async mutation(
    appId: string,
    filename: string,
    type: string,
    method: string,
    values: any,
  ): Promise<any> {
    const { data } = await this.api.post<any>(
      `/access/${appId}/module/${filename}/${type}/${method}`,
      values,
    );

    return data;
  }
}

export const runFunctionApi = new RunFunctionApi();
