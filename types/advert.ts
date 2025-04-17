import { Auth } from "./auth";
import { TMessenger } from "./messenger";
import { TEcommerceStore } from "./ecommerceStore";

type Advert = {
  id: string;
  storeID: string;
  userID: string;
  productName: string;
  productDescription: string;
  isPublished: boolean;
  images: AdvertImage[];
  tags: TMessenger["messengerTag"][];
  views: AdvertView[];
  impressions: AdvertImpression[];
  createdAt: string;
  updatedAt: string;
  user?: Auth["user"];
  store?: TEcommerceStore["store"];
  price?: AdvertPrice;
  inventory?: AdvertInventory;
};

type AdvertImage = {
  id: string;
  advertID: string;
  url: string;
  path: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
};

type AdvertPrice = {
  id: string;
  advertID: string;
  amount: number;
  currency: string;
  unit: string;
  createdAt: string;
  updatedAt: string;
};

type AdvertInventory = {
  id: string;
  advertID: string;
  quantity: number;
  unit: string;
  createdAt: string;
  updatedAt: string;
};

type Currency = {
  name: string;
  code: string;
  symbol: string;
};

type PostAdvertPriceInput = {
  advertID: string;
  amount: number;
  currency: string; //stringified json
  unit: string;
};

type PostAdvertInventoryInput = {
  advertID: string;
  quantity: number;
  unit: string;
};

type AdvertView = {
  id: string;
  advertID: string;
  userID: string;
  locationID: string;
  device: string;
  createdAt: string;
  updatedAt: string;
  user?: Auth["user"];
  location?: Location;
};

type AdvertImpression = {
  id: string;
  advertID: string;
  userID: string;
  locationID: string;
  device: string;
  createdAt: string;
  updatedAt: string;
  user?: Auth["user"];
  location?: Location;
};

type AdvertAnalytics = {
  advertID: string;
  impressionCount: number;
  viewCount: number;
};

export type TAdvert = {
  advert: Advert;
  advertImage: AdvertImage;
  advertView: AdvertView;
  advertImpression: AdvertImpression;
  advertAnalytics: AdvertAnalytics;
  advertPrice: AdvertPrice;
  postAdvertPriceInput: PostAdvertPriceInput;
  postAdvertInventoryInput: PostAdvertInventoryInput;
};
