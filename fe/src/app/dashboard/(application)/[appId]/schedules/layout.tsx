"use client";

import { Button } from "@/components/ui/button";
import { ContentWrapper } from "@/components/ui/content-wrapper";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export default function Layout({ children }: Readonly<Props>): React.JSX.Element {
    const { appId } = useParams()

    return (
        <ContentWrapper className="p-5 space-y-4">
            <div className="flex space-x-4">
                <Link href={`/dashboard/${appId}/schedules/functions`}>
                    <Button variant="ghost" className="underline text-xl">
                        Scheduled Functions
                    </Button>
                </Link>
                <Link href={`/dashboard/${appId}/schedules/crons`}>
                    <Button variant="ghost" className="underline text-xl">
                        Cron Jobs
                    </Button>
                </Link>
            </div>
            {children}
        </ContentWrapper>

    );
}
