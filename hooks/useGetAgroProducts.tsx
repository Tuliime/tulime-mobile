import { useMemo } from "react";
import { seedData } from "@/data/agroProducts";

export const useGetAgroProducts = () => {
  const getOverview = useMemo(() => {
    const uniqueCategories = new Set(seedData.map((item) => item.category));
    const overview = Array.from(uniqueCategories).map((category) =>
      seedData.find((item) => item.category === category)
    );
    return overview.slice(0, 4);
  }, []);

  const getByCategory = (category: string) => {
    return seedData.filter((item) => item.category === category);
  };

  return { getOverview, getByCategory };
};
