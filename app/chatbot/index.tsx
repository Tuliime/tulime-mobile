import React from "react";
import { View, Text } from "react-native";
import { MainLayout } from "@/components/shared/layout";

// TODO define chatbot layout
const Chatbot: React.FC = () => {
  return (
    <MainLayout title="Chatbot">
      <View>
        <Text>chatbot here</Text>
      </View>
    </MainLayout>
  );
};

export default Chatbot;
