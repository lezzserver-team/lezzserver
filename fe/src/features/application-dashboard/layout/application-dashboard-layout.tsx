"use client";

import { SlashOutline } from "@/components/icons/slash-outline";
import { Navbar } from "@/components/layouts/nav-bar";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { AppsMenu } from "@/features/applications/layouts/apps-menu";
import { EnvironmentsMenu } from "@/features/applications/layouts/environments-menu-";
import { ApplicationSidebar } from "@/features/applications/layouts/sidebar";

import { useParams, usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { RunFunctionPanel } from "../components/run-function-panel";
import { RunFunctionPanelProvider } from "../context/run-function-panel-context";
import { useApplicationDashboardLayout } from "../hooks/use-application-dashboard-layout";

export interface ApplicationDashboardLayoutProps extends PropsWithChildren { }

export function ApplicationDashboardLayout({
    children
}: Readonly<ApplicationDashboardLayoutProps>) {
    const pathname = usePathname();
    const { appId } = useParams();
    const { refResize } = useApplicationDashboardLayout()

    return (
        <div className="flex flex-col w-full min-h-screen max-h-screen">
            <Navbar
                leftContent={
                    <div className="ml-3">
                        <Breadcrumbs
                            currentPath={pathname}
                            links={[
                                { path: `/dashboard/${appId}`, label: <AppsMenu /> },
                                { path: `/dashboard/${appId}`, label: <EnvironmentsMenu /> }
                            ]}
                            separator={<SlashOutline className="fill-border" size={24} />}
                        />
                    </div>
                }
            />
            <main className="w-full max-w-screen-2xl h-dashboard-content flex-grow grid grid-cols-[10rem,_1fr] mx-auto overflow-hidden">
                <ApplicationSidebar />
                <RunFunctionPanelProvider>
                    <RunFunctionPanel refResize={refResize}>
                        {children}
                    </RunFunctionPanel>
                </RunFunctionPanelProvider>
            </main>
        </div>
    )
}