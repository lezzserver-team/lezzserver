import { ApplicationEntity } from "@/services/applications/types";
import { useEffect, useState } from "react";

export const useAppCardThreeDotsMenu = ({
  application,
}: {
  application: ApplicationEntity;
}) => {
  const [canDelete, setCanDelete] = useState(false);
  const [inputDelete, setInputDelete] = useState<string>("");

  async function onDelete() {}

  useEffect(() => {
    if (inputDelete === application.name) {
      setCanDelete(true);
    } else {
      setCanDelete(false);
    }
  }, [inputDelete, application]);

  function onChangeDelete(e: React.ChangeEvent<HTMLInputElement>) {
    setInputDelete(e.target.value);
  }

  return {
    onChangeDelete,
    onDelete,
    canDelete,
    inputDelete,
  };
};
