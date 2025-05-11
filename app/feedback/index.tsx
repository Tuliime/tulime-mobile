import { MainLayout } from "@/components/shared/layout/MainLayout";
import React from "react";
import { View, Text } from "react-native";

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
