"use client";
import { Card } from "@/components/ui/card";
import { ApplicationEntity } from "@/services/applications/types/entity";
import Link from "next/link";
import { AppCardThreeDotsMenu } from "./app-card-three-dots-menu";

interface AppCardProps {
    application: ApplicationEntity;
}

export function AppCard({ application }: Readonly<AppCardProps>): React.JSX.Element {
    return (
        <Card className="shadow-none border w-[275px] h-[115px] overflow-hidden flex items-start p-5 hover:border-primary hover:cursor-pointer">
            <Link href={`/dashboard/${application.id}/functions`} key={application.id} className="w-full h-full bg-background flex flex-col justify-between">
                <p className="text-sm font-semibold leading-6">{application.name}</p>
                <div className="flex items-center space-x-2">
                    <Link href={`/dashboard/${application.id}/functions`} className="text-sm text-primary-foreground hover:underline leading-6">Production</Link>
                    <div className="text-[8px] text-neutral-3">●</div>
                    <Link href={`/dashboard/${application.id}/functions`} className="text-sm text-primary-foreground hover:underline leading-6">Development</Link>
                </div>
            </Link>
            <AppCardThreeDotsMenu application={application} />
        </Card>
    );
}
