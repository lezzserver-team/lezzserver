"use client";

import { ApplicationDashboardLayoutProvider } from "@/features/application-dashboard/context/application-dashboard-layout-context";
import { ApplicationDashboardLayout } from "@/features/application-dashboard/layout/application-dashboard-layout";
import { FunctionPageProvider } from "@/features/application-function/context/function-page-context";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export default function Layout({ children }: Readonly<Props>): React.JSX.Element {
  return (
    <ApplicationDashboardLayoutProvider>
      <FunctionPageProvider>
        <ApplicationDashboardLayout>
          {children}
        </ApplicationDashboardLayout>
      </FunctionPageProvider>
    </ApplicationDashboardLayoutProvider>
  );
}
