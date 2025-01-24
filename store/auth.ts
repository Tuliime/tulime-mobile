import { create } from "zustand";
import { Auth, TAuth } from "@/types/auth";

const authInitialValues: Auth = {
  accessToken: "",
  refreshToken: "",
  user: {
    id: "",
    name: "",
    role: "",
    telNumber: 0,
  },
};

export const useAuthStore = create<{ auth: Auth } & TAuth["authAction"]>(
  (set) => ({
    auth: authInitialValues,
    updateAuth: (auth) => set(() => ({ auth: auth })),
    deleteAuth: () => set(() => ({ auth: authInitialValues })),
  })
);
