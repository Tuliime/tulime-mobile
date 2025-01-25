import React from "react";
import { View, Text } from "react-native";
import { SecondaryLayout } from "@/components/shared/layout/SecondaryLayout";

const Chatbot: React.FC = () => {
  return (
    <SecondaryLayout title="Chatbot">
      <View>
        <Text>chatbot here</Text>
      </View>
    </SecondaryLayout>
  );
};

export default Chatbot;
