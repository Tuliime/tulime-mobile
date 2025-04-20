import { create } from "zustand";
import { enableMapSet, produce } from "immer";
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

type TUseAdvertStore = {
  currentAdvert: TAdvert["advert"];
} & TAdvert["advertAction"];

export const useAdvertStore = create<TUseAdvertStore>((set) => ({
  currentAdvert: advertInitialValues,

  // Advert Actions
  updateCurrentAdvert: (advert) =>
    set(
      produce((state: TUseAdvertStore) => {
        state.currentAdvert = advert;
      })
    ),
  clearAdvert: () =>
    set(
      produce((state: TUseAdvertStore) => {
        state.currentAdvert = advertInitialValues;
      })
    ),
  updateAdvertImage: (image) =>
    set(
      produce((state: TUseAdvertStore) => {
        const images = state.currentAdvert.images.map(
          (img: TAdvert["advertImage"]) => (img.id === image.id ? image : img)
        );
        state.currentAdvert.images = images;
      })
    ),
  updateAdvertPrice: (price) =>
    set(
      produce((state: TUseAdvertStore) => {
        state.currentAdvert.price = price;
      })
    ),
  updateAdvertInventory: (inventory) =>
    set(
      produce((state: TUseAdvertStore) => {
        state.currentAdvert.inventory = inventory;
      })
    ),
}));
