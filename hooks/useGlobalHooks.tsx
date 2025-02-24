import { View } from "react-native";
import { useGetAllUsers } from "./useGetAllUsers";
import { useGetLiveChat } from "./useGetLiveChat";
import { useUpdateOnlineStatus } from "./useUpdateOnlineStatus";

export const UseGlobalHooks = () => {
  useGetAllUsers();
  useGetLiveChat();
  useUpdateOnlineStatus();
  return <View></View>;
};
