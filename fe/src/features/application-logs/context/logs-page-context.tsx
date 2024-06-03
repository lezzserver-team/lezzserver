import { useSearch } from "@/hooks/use-search";
import { createContext, useMemo } from 'react';
import { LogsItemProps } from "../components/logs-item";


interface LogsPageContextType {
    results: LogsItemProps[];
    search: string;
    onSearch: (query: string) => void;
    isLoading: boolean
}

export const LogsPageContext = createContext<LogsPageContextType | undefined>(undefined);

export const LogsPageProvider = ({ children }: { children: React.ReactNode }) => {
    const fakeData: LogsItemProps[] = [
        {
            date: "2/27/2024",
            hours: "8:09:26 AM",
            ms: "39ms",
            status: "success",
            type: "Query",
            query: "todo:get"
        },
        {
            date: "2/27/2024",
            hours: "8:47:14 AM",
            ms: "19ms",
            status: "success",
            type: "Query",
            query: "test:get"
        },
        {
            date: "2/27/2024",
            hours: "9:25:45 AM",
            ms: "17ms",
            status: "success",
            type: "Query",
            query: "test:get"
        },
        {
            date: "2/27/2024",
            hours: "9:26:01 AM",
            ms: "18ms",
            status: "success",
            type: "Mutation",
            query: "test:createTask"
        },
        {
            date: "2/27/2024",
            hours: "9:26:09 AM",
            ms: "12ms",
            status: "success",
            type: "Query",
            query: "test:get"
        },
        {
            date: "2/27/2024",
            hours: "9:25:45 AM",
            ms: "CACHED",
            status: "success",
            type: "Query",
            query: "test:get"
        }
    ];

    const isLoading = false

    const { results, search, onSearch } = useSearch<LogsItemProps>({
        items: fakeData,
        getLabel: (item) => item.query,
    });

    const value: LogsPageContextType = useMemo(() => {
        return {
            results,
            search,
            onSearch,
            isLoading
        };
    }, [
        results,
        search,
        onSearch,
        isLoading
    ]);

    return (
        <LogsPageContext.Provider value={value}>
            {children}
        </LogsPageContext.Provider>
    );
};