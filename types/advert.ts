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
};
