"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
import { useLogin } from "../hooks/use-login";

import { LoginFormSchema } from "../utils/validators";

export function LoginForm(): React.JSX.Element {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onSubmit",
  });

  const { onLogin, isPending } = useLogin();

  const handleSubmit = useCallback<SubmitHandler<LoginFormSchema>>(
    async (values) => {
      await onLogin(values);
    },
    [onLogin],
  );

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col mb-4">
          <h3 className="text-xl font-medium">Sign In</h3>
          <p className="text-sm text-muted-foreground">
            to continue to{" "}
            <span className="font-medium text-primary">LezzServer</span>
          </p>
        </div>
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
          Don't have an account ?{" "}
          <Link className="font-medium text-primary" href="/register">
            Register
          </Link>
        </p>
      </form>
    </Form>
  );
}
