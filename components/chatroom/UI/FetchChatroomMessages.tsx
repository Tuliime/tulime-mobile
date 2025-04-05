import { View } from "react-native";
import React from "react";
import { useGetChatroomMessages } from "../hooks/useGetChatroomMessages";

export const FetchChatroomMessages: React.FC = () => {
  useGetChatroomMessages();
  return <View></View>;
};
