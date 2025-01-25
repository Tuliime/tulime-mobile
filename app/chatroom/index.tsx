import React from "react";
import { View, Text } from "react-native";
import { MainLayout } from "@/components/shared/layout";

const Chatroom: React.FC = () => {
  return (
    <MainLayout title="Chatroom">
      <View>
        <Text>Chatroom here</Text>
      </View>
    </MainLayout>
  );
};

export default Chatroom;
