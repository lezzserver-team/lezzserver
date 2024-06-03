import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers:
    typeof window !== "undefined"
      ? {
          Authorization: `Bearer ${localStorage.token}`,
        }
      : {},
  withCredentials: true,
});
