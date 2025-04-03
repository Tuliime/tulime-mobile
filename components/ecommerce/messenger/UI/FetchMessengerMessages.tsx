import { View } from "react-native";
import React from "react";
import { useGetMessengerMessages } from "../hooks/useGetMessengerMessages";

export const FetchMessengerMessages: React.FC = () => {
  useGetMessengerMessages();
  return <View></View>;
};
