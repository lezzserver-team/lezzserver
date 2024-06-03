"use client";

import {
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense, useMemo } from "react";

import { NextTopLoader } from "@/components/shared/next-top-loader";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ExceptionHandler } from "@/services/shared/exception";


export interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({
    children,
}: Readonly<ProvidersProps>
): React.JSX.Element {
    const { toast } = useToast();

    const client = useMemo(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
            mutations: {
                onError(err) {
                    const exceptionHandler = new ExceptionHandler();

                    toast({
                        title: "Mutation Error",
                        description: exceptionHandler.error(err).message,
                    });
                },
            },
        },
        queryCache: new QueryCache({
            onError: (err) => {
                const exceptionHandler = new ExceptionHandler();

                toast({
                    title: "Query Error",
                    description: exceptionHandler.error(err).message,
                });
            },
        }),
    }), [toast]);

    return (
        <QueryClientProvider client={client}>
            <Suspense>
                <NextTopLoader color="#166DDF" />
                {children}
            </Suspense>
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
        </QueryClientProvider>
    );
}
