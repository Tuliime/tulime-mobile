import React from "react";
import { View, Text } from "react-native";
import { MainLayout } from "@/components/shared/layout";

const Feedback: React.FC = () => {
  return (
    <MainLayout title="Feedback">
      <View>
        <Text>Feedback here</Text>
      </View>
    </MainLayout>
  );
};

export default Feedback;
