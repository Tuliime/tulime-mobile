import { View } from "react-native";
import React from "react";
import { useGetMessengerThreads } from "../hooks/useGetMessengerThreads";

export const FetchMessengerThreads: React.FC = () => {
  useGetMessengerThreads();
  return <View></View>;
};
