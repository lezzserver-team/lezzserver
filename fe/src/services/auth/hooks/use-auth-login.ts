import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api";
import { type LoginDto, type AuthEntity, type LoginGithubDto } from "../types";

export const useAuthLoginWithGithub = () => {
  return useMutation<AuthEntity, Error, LoginGithubDto>({
    mutationFn: (dto) => authApi.loginGithub(dto),
  });
};


export const useAuthLogin = () => {
  return useMutation<AuthEntity, Error, LoginDto>({
    mutationFn: (dto) => authApi.login(dto)
  })
}
