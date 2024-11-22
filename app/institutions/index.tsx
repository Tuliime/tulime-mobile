import React from "react";
import { View, Text } from "react-native";
import { SecondaryLayout } from "@/components/shared/layout/SecondaryLayout";

const Institutions: React.FC = () => {
  return (
    <SecondaryLayout title="Institutions">
      <View>
        <Text>Institutions prices here</Text>
      </View>
    </SecondaryLayout>
  );
};

export default Institutions;
