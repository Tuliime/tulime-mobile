import { create } from "zustand";
import { TSidebar, TSidebarAction } from "@/types/sidebar";

export const useSidebarStore = create<TSidebar & TSidebarAction>((set) => ({
  isOpen: false,
  openSidebar: () => set(() => ({ isOpen: true })),
  closeSidebar: () => set(() => ({ isOpen: false })),
}));
