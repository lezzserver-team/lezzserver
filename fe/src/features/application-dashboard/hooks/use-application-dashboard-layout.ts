import { useContext } from 'react';
import { ApplicationDashboardLayoutContext } from '../context/application-dashboard-layout-context';

export const useApplicationDashboardLayout = () => {
    const context = useContext(ApplicationDashboardLayoutContext);
    if (!context) {
        throw new Error('useApplicationDashboardLayout must be used within a ApplicationDashboardLayoutProvider');
    }
    return context;
};

