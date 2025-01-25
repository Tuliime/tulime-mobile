import React from "react";
import { View, Text } from "react-native";
import { MainLayout } from "@/components/shared/layout";

const FarmInputs: React.FC = () => {
  return (
    <MainLayout title="Farm Inputs">
      <View>
        <Text>Farm input prices here</Text>
      </View>
    </MainLayout>
  );
};

export default FarmInputs;
