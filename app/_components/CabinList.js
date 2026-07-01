import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";
import { unstable_noStore as noStore } from "next/cache";

async function CabinList({ filter }) {
  noStore();
  const cabins = await getCabins();
  let filterdCabins;
  if (filter === "all") filterdCabins = cabins;

  if (filter === "small")
    filterdCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);

  if (filter === "medium")
    filterdCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity < 8,
    );

  if (filter === "large") {
    filterdCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }
  if (!filterdCabins.length) return null;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filterdCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
