export type TSearch = {
  results: any;
  isSearching: boolean;
};

export type TSearchAction = {
  updateIsSearching: (searching: TSearch["isSearching"]) => void;
  updateResults: (results: TSearch["results"]) => void;
};

export type TSearchAPI = {
  query: string;
};
