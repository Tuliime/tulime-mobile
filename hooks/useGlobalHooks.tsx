import { View } from "react-native";
import { useGetAllUsers } from "./useGetAllUsers";
import { useGetLiveChat } from "./useGetLiveChat";
import { useUpdateOnlineStatus } from "./useUpdateOnlineStatus";
import { useGetOnlineStatus } from "./useGetOnlineStatus";
import { useNotificationListener } from "./useNotificationListener";
import { useGetNotifications } from "./useGetNotifications";
import { useGetLiveNotifications } from "./useGetLiveNotifications";
import { useGetDeviceToken } from "./useGetDeviceToken";

export const UseGlobalHooks = () => {
  useGetAllUsers();
  useGetLiveChat();
  useGetOnlineStatus();
  useGetDeviceToken();
  useGetNotifications();
  useGetLiveNotifications();
  useUpdateOnlineStatus();
  useNotificationListener();
  return <View></View>;
};
