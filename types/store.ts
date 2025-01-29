// setHasHydrated: (state:any) => {
//   set({
//     _hasHydrated: state
//   });

export type TStoreHydration = {
  _hasHydrated: boolean;
  setHasHydrated: (state: any) => void;
};
