import { useCallback, useMemo, useState } from "react";

interface useSearchProps<T> {
  items?: T[];
  getLabel?: (item: T) => string;
}

export const useSearch = <T = string>({
  items,
  getLabel,
}: useSearchProps<T>) => {
  const [search, setSearch] = useState<string>("");

  const results = useMemo(() => {
    return (
      items?.filter((item) => {
        if (!getLabel)
          return (item as string).toLowerCase().includes(search.toLowerCase());

        return (getLabel(item) as string)
          .toLowerCase()
          .includes(search.toLowerCase());
      }) ?? []
    );
  }, [items, search, getLabel]);

  const onSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return { results, search, onSearch };
};
