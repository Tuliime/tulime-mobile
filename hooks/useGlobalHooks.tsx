import { View } from "react-native";
import { useGetAllUsers } from "./useGetAllUsers";
import { useGetLiveChat } from "./useGetLiveChat";
import { useUpdateOnlineStatus } from "./useUpdateOnlineStatus";
import { useGetOnlineStatus } from "./useGetOnlineStatus";
import { useNotificationListener } from "./useNotificationListener";
import { useGetNotifications } from "./useGetNotifications";
import { useGetLiveNotifications } from "./useGetLiveNotifications";
import { useGetDeviceToken } from "./useGetDeviceToken";
import { useGetEventStream } from "./useGetEventStream";

export const UseGlobalHooks = () => {
  useGetAllUsers();
  // useGetLiveChat(); //To be removed
  useGetEventStream();
  useGetOnlineStatus();
  useGetDeviceToken(); //To fix the bug
  useGetNotifications();
  // useGetLiveNotifications(); //To be removed
  useUpdateOnlineStatus();
  useNotificationListener();
  return <View></View>;
};
