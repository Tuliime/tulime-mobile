import { View } from "react-native";
import { useGetAllUsers } from "./useGetAllUsers";
import { useGetLiveChat } from "./useGetLiveChat";

export const UseGlobalHooks = () => {
  useGetAllUsers();
  useGetLiveChat();
  return <View></View>;
};
