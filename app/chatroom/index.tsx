import React from "react";
import { View, Text } from "react-native";
import { SecondaryLayout } from "@/components/shared/layout/SecondaryLayout";

const Chatroom: React.FC = () => {
  return (
    <SecondaryLayout title="Chatroom">
      <View>
        <Text>Chatroom here</Text>
      </View>
    </SecondaryLayout>
  );
};

export default Chatroom;
