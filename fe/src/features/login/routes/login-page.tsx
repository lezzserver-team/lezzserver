import { LoginForm } from "../components/form";
import { Card } from "@/components/ui/card";

export function LoginPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#2C7AE0] to-[#FFA133]">
      <Card className="w-full max-w-md rounded-2xl border-none px-8 py-6 shadow-none">
        <LoginForm />
      </Card>
    </div>

  )
}
