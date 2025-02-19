"use client";

import { useCallback, useMemo, useState } from "react";

import { Category } from "@prisma/client";
import { useDebounce } from "use-debounce";

import { Input } from "@/components/ui/input";

interface Props {
  selectedCategories?: Category[];
  allCategories: Category[];
  onChange: (values: string[]) => void;
}

export function CategoriesToggle({
  selectedCategories = [],
  allCategories,
  onChange,
}: Props) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [values, setValues] = useState(() =>
    selectedCategories.map((c) => c.id)
  );

  const filteredCategories = useMemo(
    () =>
      allCategories.filter((c) =>
        c.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      ),
    [allCategories, debouncedSearch]
  );

  const toggleCategory = useCallback(
    (id: string) => {
      setValues((prev) => {
        const newValues = prev.includes(id)
          ? prev.filter((v) => v !== id)
          : [...prev, id];
        return newValues;
      });
      onChange(
        values.includes(id) ? values.filter((v) => v !== id) : [...values, id]
      );
    },
    [values, onChange]
  );

  console.log(filteredCategories);

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="text"
        placeholder="Buscar categoria..."
        className="w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredCategories.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {filteredCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                values.includes(category.id)
                  ? "bg-green-600 border-green-600 text-white"
                  : "bg-background text-foreground"
              }`}
              onClick={() => toggleCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
