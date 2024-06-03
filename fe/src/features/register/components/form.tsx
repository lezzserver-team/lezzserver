"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthRegister } from "@/services/auth/hooks/use-auth-register";

import type { RegisterFormSchema } from "../validators";
import { registerFormSchema } from "../validators";

export function RegisterForm(): React.JSX.Element {
  const router = useRouter();

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    mode: "onSubmit",
  });

  const { mutateAsync: mutateAuthRegister, isPending } = useAuthRegister();

  const handleSubmit = useCallback<SubmitHandler<RegisterFormSchema>>(
    async (values) => {
      await mutateAuthRegister(values);

      router.replace("/dashboard");
    },
    [mutateAuthRegister, router],
  );

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col mb-4">
          <h3 className="text-xl font-medium">Sign Up</h3>
          <p className="text-sm text-muted-foreground">
            to continue to{" "}
            <span className="font-medium text-primary">LezzServer</span>
          </p>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full text-white mt-2"
          disabled={isPending || !form.formState.isValid}
          type="submit"
        >
          Continue
        </Button>

        <p className="text-sm text-muted-foreground my-4">
          Already have an account?{" "}
          <Link className="font-medium text-primary" href="/login">
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  );
}

