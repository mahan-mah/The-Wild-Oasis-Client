"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFilterActive = searchParams.get("capacity") ?? "all";
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="flex gap-4  border border-primary-800 ">
      <Button
        currentFilterActive={currentFilterActive}
        filterName="all"
        onFilter={handleFilter}
      >
        All cabins
      </Button>
      <Button
        currentFilterActive={currentFilterActive}
        filterName="small"
        onFilter={handleFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        currentFilterActive={currentFilterActive}
        filterName="medium"
        onFilter={handleFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        currentFilterActive={currentFilterActive}
        filterName="large"
        onFilter={handleFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}
function Button({ currentFilterActive, filterName, onFilter, children }) {
  return (
    <button
      onClick={() => onFilter(filterName)}
      className={`px-5 py-2 ${currentFilterActive === filterName ? "bg-primary-700 text-primary-50" : ""} hover:bg-primary-700`}
    >
      {children}
    </button>
  );
}
export default Filter;
