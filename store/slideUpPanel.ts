import { TSlideUpPanel } from "@/types/slideUpPanel";
import { create } from "zustand";

export const useSlideUpPanelStore = create<
  { isOpen: TSlideUpPanel["isOpen"] } & TSlideUpPanel["panelActions"]
>((set) => ({
  isOpen: false,
  openPanel: () => set(() => ({ isOpen: true })),
  closePanel: () => set(() => ({ isOpen: false })),
}));
