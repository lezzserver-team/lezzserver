import * as React from "react";

import { useRouter } from "@/hooks/use-router";
import { useFindApplication } from "@/services/applications/hooks/use-find-application";

export const useAppsMenu = () => {
    const router = useRouter();
    const [search, setSearch] = React.useState<string>("");

    const { data: applications } = useFindApplication();

    const filteredApplications = React.useMemo(() => {
        return applications.filter((item) => item.name.includes(search));
    }, [applications, search]);

    const onAdd = React.useCallback(() => {
        router.push("/dashboard/new");
    }, [router]);

    const onClick = React.useCallback(
        (id: string) => {
            router.push(`/dashboard/${id}`);
        },
        [router]
    );

    const onSearchChange = React.useCallback((value: string) => {
        setSearch(value);
    }, []);

    return {
        filteredApplications,
        search,
        onAdd,
        onClick,
        onSearchChange,
    };
};
