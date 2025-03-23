import { MessengerContentLayout } from "@/components/ecommerce/messenger/layout/MessengerContentLayout";
import { FetchMessengerThreads } from "@/components/ecommerce/messenger/UI/FetchMessengerThreads";
import React from "react";
import { View } from "react-native";

const Messenger: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <FetchMessengerThreads />
      <MessengerContentLayout />
    </View>
  );
};

export default Messenger;
