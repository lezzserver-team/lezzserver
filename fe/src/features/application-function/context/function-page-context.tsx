import { useSearch } from "@/hooks/use-search";
import { useFindFunction } from "@/services/functions/hooks/use-find-function";
import { FunctionEntity } from "@/services/functions/types";
import { useParams, useSearchParams } from "next/navigation";
import { createContext, useMemo } from 'react';


export interface FunctionParams {
    displayName: string,
    method: string
}

interface FunctionPageContextType {
    isLoading: boolean;
    appId: string;
    functionParams: FunctionParams;
    results: FunctionEntity[];
    search: string;
    onSearch: (query: string) => void;
    isMethodSelected: boolean;
}

export const FunctionPageContext = createContext<FunctionPageContextType | undefined>(undefined);

export const FunctionPageProvider = ({ children }: { children: React.ReactNode }) => {
    const { appId } = useParams()

    const searchParams = useSearchParams()
    const functionParamsValue = searchParams.get('function');
    const [displayName, method] = functionParamsValue ? decodeURIComponent(functionParamsValue).split(":") : ['', ''];

    const functionParams: FunctionParams = useMemo(() => {
        return {
            displayName,
            method
        }
    }, [displayName, method])

    const { data, isLoading } = useFindFunction(appId as string)

    const isMethodSelected = !!(functionParams.method || functionParams.displayName)

    const { results, search, onSearch } = useSearch<FunctionEntity>({
        items: data,
        getLabel: (item) => item.displayName,
    });

    const value: FunctionPageContextType = useMemo(() => {
        return {
            isLoading,
            appId: appId as string,
            functionParams,
            results,
            search,
            onSearch,
            isMethodSelected
        };
    }, [isLoading, appId, functionParams, results, search, onSearch, isMethodSelected]);

    return (
        <FunctionPageContext.Provider value={value}>
            {children}
        </FunctionPageContext.Provider>
    );
};