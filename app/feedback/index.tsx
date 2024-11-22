import React from "react";
import { View, Text } from "react-native";
import { SecondaryLayout } from "@/components/shared/layout/SecondaryLayout";

const Feedback: React.FC = () => {
  return (
    <SecondaryLayout title="Feedback">
      <View>
        <Text>Feedback here</Text>
      </View>
    </SecondaryLayout>
  );
};

export default Feedback;
