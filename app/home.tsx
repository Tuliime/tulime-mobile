import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { View, Text } from "react-native";

export default function Home() {
  return (
    <MainLayout
      headerLeft={
        <View>
          <Text>Header Left</Text>
        </View>
      }
      headerRight={
        <View>
          <Text>Header Right</Text>
        </View>
      }
    >
      <Text>home Screen content here</Text>
    </MainLayout>
  );
}
