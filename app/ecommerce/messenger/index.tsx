import { MessengerContentLayout } from "@/components/ecommerce/messenger/layout/MessengerContentLayout";
import { FetchMessengerMessages } from "@/components/ecommerce/messenger/UI/FetchMessengerMessages";
import React from "react";
import { View } from "react-native";

const Messenger: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <FetchMessengerMessages />
      <MessengerContentLayout />
    </View>
  );
};

export default Messenger;
