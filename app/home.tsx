import React from "react";
import { HomeLayout } from "@/components/shared/layout";
import { View, Text } from "react-native";

export default function Home() {
  return (
    <HomeLayout
      header={
        <View>
          <Text>Header Content here</Text>
        </View>
      }
    >
      <View>
        <Text>Home content here</Text>
      </View>
    </HomeLayout>
  );
}
