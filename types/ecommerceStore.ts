import { Auth } from "./auth";
import { TAdvert } from "./advert";

export type Store = {
  id: string;
  userID: string;
  name: string;
  description: string;
  website: string;
  email: string;
  location: string;
  logoUrl: string;
  logoPath: string;
  backgroundImageUrl: string;
  backgroundImagePath: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  user?: Auth["user"];
  adverts?: TAdvert["advert"][];
  feedback?: StoreFeedback[];
};

export type StoreFeedback = {
  id: string;
  storeID: string;
  userID: string;
  experience: string;
  title: string;
  description: string;
  reply: string;
  files: StoreFeedbackFile[];
  createdAt: string;
  updatedAt: string;
  store?: Store;
  user?: Auth["user"];
};

export type StoreFeedbackFile = {
  id: string;
  storeFeedbackID: string;
  url: string;
  path: string;
  createdAt: string;
  updatedAt: string;
};

export type Location = {
  id: string;
  name: string;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
};

export type TEcommerceStore = {
  store: Store;
};
