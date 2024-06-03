import { useGetFunction } from "@/services/functions/hooks/use-get-function";
import {
  ParsedFunctionCode,
  parseFunctionCode,
} from "@/utils/functions/format";
import { formatJson } from "@/utils/utils";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRunFunctionPanel } from "./use-run-function-panel";

export const useRunFunctionInputArgument = () => {
  const { selectedRunFunction, onQuery, selectedFunction, selectedMethod } =
    useRunFunctionPanel();

  const [defaultValue, setDefaultValue] =
    useState<Record<ParsedFunctionCode["type"], string>>();

  const { appId } = useParams();

  const { data: functionCode } = useGetFunction(
    appId as string,
    `${selectedFunction}.ts`,
  );

  const parsedFunction = useMemo(() => {
    return parseFunctionCode(functionCode ?? "", selectedMethod);
  }, [selectedMethod, functionCode]);

  const getDefaultValue = useCallback(async () => {
    setDefaultValue({
      mutation: await formatJson(
        JSON.stringify({
          name: "",
          isDone: false,
        }),
      ),
      query: await formatJson(JSON.stringify({})),
    });
  }, []);

  useEffect(() => {
    if (parsedFunction?.type === "query") onQuery();
  }, [onQuery, selectedRunFunction, parsedFunction]);

  useEffect(() => {
    getDefaultValue();
  }, [getDefaultValue, parsedFunction, onQuery]);

  let argumentOptions = useMemo(() => {
    if (parsedFunction?.type === "mutation")
      return {
        height: "20vh",
        defaultValue: defaultValue?.mutation,
      };

    return {
      height: "35vh",
      defaultValue: defaultValue?.query,
    };
  }, [parsedFunction, defaultValue]);

  return {
    parsedFunction,
    argumentOptions,
  };
};
