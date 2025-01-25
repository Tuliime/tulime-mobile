import React from "react";
import { View, Text } from "react-native";
import { MainLayout } from "@/components/shared/layout";

const Institutions: React.FC = () => {
  return (
    <MainLayout title="Institutions">
      <View>
        <Text>Institutions prices here</Text>
      </View>
    </MainLayout>
  );
};

export default Institutions;
