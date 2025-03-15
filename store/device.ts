import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { produce, enableMapSet } from "immer";
import { TDevice } from "@/types/device";
import { TStoreHydration } from "@/types/store";

enableMapSet(); // Enable Map & Set support for

const getStorageKey = () => {
  const env = process.env.NODE_ENV;
  const environment = process.env.EXPO_PUBLIC_ENV;

  console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
  console.log("process.env.EXPO_PUBLIC_ENV: ", process.env.EXPO_PUBLIC_ENV);

  if (environment === "preview") return "device-storage-preview";
  if (environment === "production") return "device-storage-prod";

  if (env === "development") return "device-storage-dev";
  if (env === "production") return "device-storage-prod";
  return "device-storage-preview"; // Default to preview
};

const initialDevice = {
  id: "",
  userID: "",
  token: "",
  tokenType: "",
  name: "",
  notificationDisabled: false,
  createdAt: "",
  updatedAt: "",
};

type TUseDeviceStore = {
  currentDevice: TDevice["device"];
  devices: TDevice["device"][]; //All user devices
} & TDevice["deviceAction"] &
  TStoreHydration;

export const useDeviceStore = create(
  persist<TUseDeviceStore>(
    (set) => ({
      currentDevice: initialDevice,
      devices: [],

      // Device Actions
      updateCurrentDevice: (device) =>
        set(
          produce((state: TUseDeviceStore) => {
            state.currentDevice = device;
          })
        ),
      updateAllDevices: (devices) =>
        set(
          produce((state: TUseDeviceStore) => {
            state.devices = devices;
          })
        ),
      AddDevice: (newDevice) =>
        set(
          produce((state: TUseDeviceStore) => {
            const alreadyHasDevice: boolean = !!state.devices.find(
              (device: TDevice["device"]) => device.id === newDevice.id
            );
            if (alreadyHasDevice) return;
            state.devices.push(newDevice);
          })
        ),
      clearAllDevices: () =>
        set(
          produce((state: TUseDeviceStore) => {
            state.devices = [];
            state.currentDevice = initialDevice;
          })
        ),

      // Track Hydration State
      _hasHydrated: false,
      setHasHydrated: (state: any) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      // name: "device-storage",
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
          console.log("useDeviceStore store hydrated");
        };
      },
    }
  )
);
