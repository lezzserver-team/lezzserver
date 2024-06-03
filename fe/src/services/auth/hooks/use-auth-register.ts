import { authApi } from "../api";
import { useMutation } from "@tanstack/react-query";
import type { RegisterDto } from "../types";

export const useAuthRegister = () => {
  return useMutation<any, Error, RegisterDto>({
    mutationFn: (dto) =>  authApi.register(dto)
  });
};

