import { useAuthLoginWithGithub } from "@/services/auth/hooks/use-auth-login";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export interface UseLoginProps {
  code: string;
  identity: string;
}

export const useGithubLogin = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const identity = searchParams.get("identity") as string;
  const code = searchParams.get("code") as string;

  const { mutateAsync: mutateAuthLogin, isPending } = useAuthLoginWithGithub();

  async function onLoginGithub() {
    router.replace(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/login/github/page?identity=${identity}`,
    );
  }

  const onDetectLoginGithub = useCallback(async () => {
    try {
      const { token } = await mutateAuthLogin({ code, identity });

      localStorage.setItem("token", token);
      localStorage.setItem("identity", identity);
      router.replace("/dashboard");
    } catch (error: unknown) {
      console.error(error);
    }
  }, [mutateAuthLogin, code, identity, router]);

  useEffect(() => {
    if (code && identity) onDetectLoginGithub();
  }, [code, identity, onDetectLoginGithub]);

  return {
    onLoginGithub,
    isPending,
  };
};
