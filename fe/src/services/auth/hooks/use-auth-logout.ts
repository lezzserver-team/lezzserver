import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";
import type { AuthEntity } from "../types";

export const useAuthLogout = () => {
  return useMutation<AuthEntity>({
    mutationFn: () => authApi.logout(),
  });
};
