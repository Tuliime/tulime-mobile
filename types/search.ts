import { TAdvert } from "./advert";
import { TNews } from "./news";

export type TSearchAction = {
  updateIsSearching: (searching: TSearch["isSearching"]) => void;
  updateResults: (results: TSearch["results"]) => void;
};

export type TSearchAPI = {
  query: string;
  parameters: string;
};

type TSearchResult = {
  news?: TNews["news"][];
  adverts?: TAdvert["advert"][];
};

export type TSearch = {
  results: TSearchResult;
  isSearching: boolean;
};
