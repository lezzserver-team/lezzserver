import { useSearch } from "@/hooks/use-search";
import { useFindFunction } from "@/services/functions/hooks/use-find-function";
import { FunctionEntity } from "@/services/functions/types";
import { useParams, useSearchParams } from "next/navigation";
import { createContext, useMemo } from 'react';


interface DataPageContextType {
    isLoading: boolean;
    appId: string;
    tableParams: string;
    results: FunctionEntity[];
    search: string;
    onSearch: (query: string) => void;
    MDEmptyData: string
    isDataEmpty: boolean
}

export const DataPageContext = createContext<DataPageContextType | undefined>(undefined);

export const DataPageProvider = ({ children }: { children: React.ReactNode }) => {
    const { appId } = useParams()

    const searchParams = useSearchParams()
    const tableParams = searchParams.get('table') as string;

    const { data, isLoading } = useFindFunction(appId as string)

    const { results, search, onSearch } = useSearch<FunctionEntity>({
        items: data,
        getLabel: (item) => item.displayName,
    });

    //TODO: Change this later to real data check
    const isDataEmpty = true

    const MDEmptyData = `import { mutation } from "./_generated/server";
import { v } from "lezzserver/values";

export const createTask = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("tasks", { text: args.text });
    },
});`

    const value: DataPageContextType = useMemo(() => {
        return {
            isLoading,
            appId: appId as string,
            tableParams,
            results,
            search,
            onSearch,
            MDEmptyData,
            isDataEmpty
        };
    }, [
        isLoading,
        appId,
        tableParams,
        results,
        search,
        onSearch,
        MDEmptyData,
        isDataEmpty
    ]);

    return (
        <DataPageContext.Provider value={value}>
            {children}
        </DataPageContext.Provider>
    );
};