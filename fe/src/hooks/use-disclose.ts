import { useCallback, useState } from "react";

export const useDisclose = (initState?: boolean) => {
  const [isOpen, setIsOpen] = useState(initState ?? false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, onOpen, onClose, onToggle, setIsOpen };
};
