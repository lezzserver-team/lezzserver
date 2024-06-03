"use client";

import { Card } from "@/components/ui/card";

import { RegisterForm } from "../components/form"

export function RegisterPage(): React.JSX.Element {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#2C7AE0] to-[#FFA133]">
      <Card className="w-full max-w-md rounded-2xl border-none px-8 py-6 shadow-none">
        <RegisterForm />
      </Card>
    </div>
  );
}

