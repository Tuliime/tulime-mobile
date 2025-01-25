import React from "react";
import { View, Text } from "react-native";
import { MainLayout } from "@/components/shared/layout";

const Settings: React.FC = () => {
  return (
    <MainLayout title="Settings">
      <View>
        <Text>Settings here</Text>
      </View>
    </MainLayout>
  );
};

export default Settings;
