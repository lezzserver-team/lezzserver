import axios from "axios";

import type { BaseErrorResponse } from "./types";

export class ExceptionHandler {
  error(error: unknown): BaseErrorResponse {
    if (axios.isAxiosError(error) && error.response) {
      let message = String(error.response.data);
      if (error.response.data?.message) {
        message = error.response.data.message;
      }

      if (
        !error.response.data?.message &&
        typeof error.response.data === "object"
      ) {
        message = JSON.stringify(error.response.data);
      }

      return {
        message,
        statusCode: error.response.status,
        error: error.response.data?.error,
      };
    }

    return {
      message: "Error",
      statusCode: 500,
      error: "",
    };
  }
}
