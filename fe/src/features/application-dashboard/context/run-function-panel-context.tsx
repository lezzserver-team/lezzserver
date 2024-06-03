import { useFunctionPage } from "@/features/application-function/hooks/use-function-page";
import { useRunFunction } from "@/services/functions/hooks/use-run-function-execute";
import { FunctionEntity } from "@/services/functions/types";
import { formatJson } from "@/utils/utils";
import { useParams } from "next/navigation";
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';


export interface FunctionParams {
    displayName: string,
    method: string
}

interface RunFunctionPanelContextType {
    data: string
    functions: FunctionEntity[]
    functionParams: FunctionParams
    selectedRunFunction: {
        displayName: string;
        method: string;
    }
    onChange: (value: string) => void
    onChangeArguments: (value?: string) => void
    onMutation: () => void,
    onQuery: () => void,
    selectedValue: string,
    isPendingMutation: boolean,
    isPendingQuery: boolean,
    selectedFunction: string,
    selectedMethod: string
}

export const RunFunctionPanelContext = createContext<RunFunctionPanelContextType | undefined>(undefined);

export const RunFunctionPanelProvider = ({ children }: { children: React.ReactNode }) => {
    const { results: functions, functionParams } = useFunctionPage();
    const [selectedRunFunction, setSelectedRunFunction] = useState<{
        displayName: string;
        method: string;
    }>({ displayName: "", method: "" });

    const { appId } = useParams();
    const [data, setData] = useState<string>("");

    const [currentArguments, setCurrentArguments] = useState<string>("");

    const selectedMethod = useMemo(() => {
        return selectedRunFunction.method || functionParams.method;
    }, [selectedRunFunction, functionParams]);

    const selectedFunction = useMemo(() => {
        return selectedRunFunction.displayName || functionParams.displayName;
    }, [
        functionParams.displayName,
        selectedRunFunction.displayName
    ]);

    const selectedValue = useMemo(() => {
        if (selectedRunFunction.displayName && selectedRunFunction.method) {
            return `${selectedRunFunction.displayName}:${selectedRunFunction.method}`
        }

        if (functionParams.displayName && functionParams.method) {
            return `${functionParams.displayName}:${functionParams.method}`
        }

        return ""
    }, [
        functionParams.displayName,
        functionParams.method,
        selectedRunFunction.displayName,
        selectedRunFunction.method
    ]);

    const { data: mutationData, isPending: isPendingMutation, mutateAsync: mutateAsyncMutation } = useRunFunction({ appId: appId as string, filename: `${selectedFunction}.ts`, type: "mutation", method: selectedMethod })
    const { data: queryData, isPending: isPendingQuery, mutateAsync: mutateAsyncQuery } = useRunFunction({ appId: appId as string, filename: `${selectedFunction}.ts`, type: "query", method: selectedMethod })

    const onQuery = useCallback(async () => {
        await mutateAsyncQuery({})
    }, [mutateAsyncQuery])

    const onMutation = useCallback(async () => {
        const request: unknown = JSON.parse(currentArguments)
        await mutateAsyncMutation({
            args: Array.isArray(request) ? request : [request],
        })
    }, [currentArguments, mutateAsyncMutation])

    const syncDataMutation = useCallback(async () => {
        const formattedJson = await formatJson(JSON.stringify(mutationData));
        setData(formattedJson);
    }, [mutationData])

    const syncDataQuery = useCallback(async () => {
        const formattedJson = await formatJson(JSON.stringify(queryData));
        setData(formattedJson);
    }, [queryData])

    useEffect(() => {
        syncDataMutation()
    }, [
        mutateAsyncMutation,
        mutationData,
        syncDataMutation
    ])

    useEffect(() => {
        syncDataQuery()
    }, [
        mutateAsyncQuery,
        queryData,
        syncDataQuery
    ])

    const onChange = useCallback((value: string) => {
        setData("");
        const [displayName, method] = value.split(":");
        setSelectedRunFunction({
            displayName,
            method,
        });
    }, [])

    useEffect(() => {
        setData("");
        setSelectedRunFunction({
            displayName: "",
            method: "",
        });
    }, [functionParams]);

    const onChangeArguments = useCallback((value?: string) => {
        setCurrentArguments(value as string)
    }, [])

    const value = useMemo(() => {
        return {
            data,
            functions,
            functionParams,
            selectedRunFunction,
            onChange,
            onChangeArguments,
            onMutation,
            onQuery,
            selectedValue,
            isPendingMutation,
            isPendingQuery,
            selectedMethod,
            selectedFunction
        }
    }, [
        data,
        functions,
        functionParams,
        selectedRunFunction,
        onChange,
        onChangeArguments,
        onMutation,
        onQuery,
        selectedValue,
        isPendingMutation,
        isPendingQuery,
        selectedMethod,
        selectedFunction
    ]);

    return (
        <RunFunctionPanelContext.Provider value={value}>
            {children}
        </RunFunctionPanelContext.Provider>
    );
};