import { TSearch, TSearchAction } from "@/types/search";
import { create } from "zustand";

export const useSearchStore = create<TSearch & TSearchAction>((set) => ({
  results: {},
  isSearching: false,
  updateIsSearching: (searching) => set(() => ({ isSearching: searching })),
  updateResults: (results) => set(() => ({ results: results })),
}));
