import { useAuthLogin } from "@/services/auth/hooks/use-auth-login";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginFormSchema } from "../utils/validators";

export const useLogin = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const identity = searchParams.get("identity") as string;
  const { mutateAsync, isPending } = useAuthLogin()

  async function onLogin (data: LoginFormSchema) {
    const resp = await mutateAsync({ ...data, identity })
    localStorage.setItem("token", resp.token);
    router.replace('/dashboard')
  }

  return {
    onLogin,
    isPending
  }
}
