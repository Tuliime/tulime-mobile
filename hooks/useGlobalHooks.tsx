import { View } from "react-native";
import { useGetAllUsers } from "./useGetAllUsers";

export const UseGlobalHooks = () => {
  useGetAllUsers();
  return <View></View>;
};
