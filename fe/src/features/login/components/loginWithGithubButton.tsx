"use client"

import { GithubIcon } from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useGithubLogin } from "../hooks/use-login-github";

export function LoginForm() {
    const { onLoginGithub } = useGithubLogin()

    return (
        <>
            <Image
                alt="brand image"
                height={100}
                src="/images/brand.svg"
                style={{ objectFit: "contain" }}
                width={150}
            />
            <Button onClick={onLoginGithub} className="text-white">
                <GithubIcon className="mr-2 h-4 w-4" />
                Log in with Github
            </Button>
        </>
    )
}
