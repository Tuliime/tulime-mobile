import { View } from "react-native";
import { useGetAllUsers } from "./useGetAllUsers";
import { useGetLiveChat } from "./useGetLiveChat";
import { useUpdateOnlineStatus } from "./useUpdateOnlineStatus";
import { useGetOnlineStatus } from "./useGetOnlineStatus";

export const UseGlobalHooks = () => {
  useGetAllUsers();
  useGetLiveChat();
  useGetOnlineStatus();
  useUpdateOnlineStatus();
  return <View></View>;
};
