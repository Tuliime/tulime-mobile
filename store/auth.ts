import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth, TAuth } from "@/types/auth";
import { TStoreHydration } from "@/types/store";

const getStorageKey = () => {
  const env = process.env.NODE_ENV;
  if (env === "development") return "auth-storage-dev";
  if (env === "production") return "auth-storage-prod";
  return "auth-storage-preview"; // Default to preview
};

const authInitialValues: Auth = {
  accessToken: "",
  refreshToken: "",
  user: {
    id: "",
    name: "",
    role: "",
    telNumber: 0,
    imageUrl: "",
    createdAt: "",
    updatedAt: "",
    profileBgColor: "",
    chatroomColor: "",
  },
};

export const useAuthStore = create(
  persist<
    { auth: Auth } & TAuth["authAction"] & {
        users: Auth["user"][];
      } & TStoreHydration
  >(
    (set) => ({
      auth: authInitialValues,
      users: [],
      updateAuth: (auth) => set(() => ({ auth })),
      deleteAuth: () => set(() => ({ auth: authInitialValues })),
      updateUser: (user) =>
        set((state) => ({
          auth: { ...state.auth, user: { ...state.auth.user, ...user } },
        })),
      updateAllUsers: (users) => set(() => ({ users: users })),
      clearAllUsers: () => set(() => ({ users: [] })),
      // Track Hydration State
      _hasHydrated: false,
      setHasHydrated: (state: any) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      // name: "auth-storage",
      name: getStorageKey(),
      storage: {
        getItem: async (key) => {
          const value = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
      onRehydrateStorage: (state) => {
        return () => {
          state.setHasHydrated(true);
          console.log("useAuthStore store hydrated");
        };
      },
    }
  )
);
