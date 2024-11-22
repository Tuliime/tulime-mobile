import React from "react";
import { View, Text } from "react-native";
import { SecondaryLayout } from "@/components/shared/layout/SecondaryLayout";

const FarmInputs: React.FC = () => {
  return (
    <SecondaryLayout title="Farm Inputs">
      <View>
        <Text>Farm input prices here</Text>
      </View>
    </SecondaryLayout>
  );
};

export default FarmInputs;
