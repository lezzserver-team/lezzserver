import { formatJson } from "@/utils/utils";
import { useEffect, useState } from "react";

export const useDataContent = () => {
  const json = JSON.stringify([
    {
      _id: "",
      status: "",
    },
  ]);

  const isLoading = false;

  const [addDocumentDefaultJson, setAddDocumentDefaultJson] =
    useState<string>("");

  async function getFormattedJson(json: string) {
    const formattedJson = await formatJson(json);

    setAddDocumentDefaultJson(formattedJson);
  }

  useEffect(() => {
    getFormattedJson(json);
  }, [json]);

  return {
    isLoading,
    addDocumentDefaultJson,
  };
};
