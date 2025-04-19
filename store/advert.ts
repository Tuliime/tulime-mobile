import { create } from "zustand";
import { enableMapSet } from "immer";
import { TAdvert } from "@/types/advert";

enableMapSet();

const advertInitialValues: TAdvert["advert"] = {
  id: "",
  storeID: "",
  userID: "",
  productName: "",
  productDescription: "",
  isPublished: false,
  images: [],
  tags: [],
  views: [],
  impressions: [],
  createdAt: "",
  updatedAt: "",
};

export const useAdvertStore = create<
  {
    currentAdvert: TAdvert["advert"];
  } & TAdvert["advertAction"]
>((set) => ({
  currentAdvert: advertInitialValues,

  // Advert Actions
  updateCurrentAdvert: (advert) =>
    set(() => ({
      currentAdvert: advert,
    })),
  clearAdvert: () =>
    set(() => ({
      currentAdvert: advertInitialValues,
    })),
}));
