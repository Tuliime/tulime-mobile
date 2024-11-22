import React from "react";
import { View, Text } from "react-native";
import { SecondaryLayout } from "@/components/shared/layout/SecondaryLayout";

const Settings: React.FC = () => {
  return (
    <SecondaryLayout title="Settings">
      <View>
        <Text>Settings here</Text>
      </View>
    </SecondaryLayout>
  );
};

export default Settings;
