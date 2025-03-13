import { View } from "react-native";
import { useGetAllUsers } from "./useGetAllUsers";
import { useGetLiveChat } from "./useGetLiveChat";
import { useUpdateOnlineStatus } from "./useUpdateOnlineStatus";
import { useGetOnlineStatus } from "./useGetOnlineStatus";
import { useNotificationListener } from "./useNotificationListener";
import { useGetNotifications } from "./useGetNotifications";

export const UseGlobalHooks = () => {
  useGetAllUsers();
  useGetLiveChat();
  useGetOnlineStatus();
  useGetNotifications();
  useUpdateOnlineStatus();
  useNotificationListener();
  return <View></View>;
};
