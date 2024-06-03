import { RefObject, createContext, useMemo, useRef } from 'react';
import { ImperativePanelHandle } from "react-resizable-panels";


interface ApplicationDashboardLayoutContextType {
    refResize: RefObject<ImperativePanelHandle>;
}

export const ApplicationDashboardLayoutContext = createContext<ApplicationDashboardLayoutContextType | undefined>(undefined);

export const ApplicationDashboardLayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const refResize = useRef<ImperativePanelHandle>(null);

    const value: ApplicationDashboardLayoutContextType = useMemo(() => {
        return {
            refResize
        };
    }, [refResize]);

    return (
        <ApplicationDashboardLayoutContext.Provider value={value}>
            {children}
        </ApplicationDashboardLayoutContext.Provider>
    );
};