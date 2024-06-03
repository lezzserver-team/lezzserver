"use client";

import { Navbar } from "@/components/layouts/nav-bar";
import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export default function WorkspaceDashboardLayout({ children }: Readonly<Props>): React.JSX.Element {
    return (
        <div className="flex flex-col w-full min-h-screen max-h-screen">
            <Navbar
                leftContent={
                    <div className="ml-4">
                        <Button variant="link">
                            Projects
                        </Button>
                    </div>
                }
            />
            <main className="w-full max-w-screen-xl py-6 px-10 mx-auto flex-grow">
                {children}
            </main>
        </div>
    );
}
