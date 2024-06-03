import { useContext } from 'react';
import { FunctionPageContext } from "../context/function-page-context";

export const useFunctionPage = () => {
    const context = useContext(FunctionPageContext);
    if (!context) {
        throw new Error('useFunctionContext must be used within a FunctionProvider');
    }
    return context;
};

