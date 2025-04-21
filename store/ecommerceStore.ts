import { create } from "zustand";
import { enableMapSet, produce } from "immer";
import { TEcommerceStore } from "@/types/ecommerceStore";

enableMapSet();

const storeInitialValues: TEcommerceStore["store"] = {
  id: "",
  userID: "",
  name: "",
  description: "",
  website: "",
  email: "",
  location: "",
  logoUrl: "",
  logoPath: "",
  backgroundImageUrl: "",
  backgroundImagePath: "",
  type: "",
  createdAt: "",
  updatedAt: "",
};

type TUseEcommerceStore = {
  currentStore: TEcommerceStore["store"];
} & TEcommerceStore["storeAction"];

export const useEcommerceStore = create<TUseEcommerceStore>((set) => ({
  currentStore: storeInitialValues,
  // ecommerce Actions
  updateCurrentStore: (store) =>
    set(
      produce((state: TUseEcommerceStore) => {
        state.currentStore = store;
      })
    ),
  clearStore: () =>
    set(
      produce((state: TUseEcommerceStore) => {
        state.currentStore = storeInitialValues;
      })
    ),
}));
