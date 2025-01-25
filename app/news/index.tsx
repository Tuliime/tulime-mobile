import React from "react";
import { View, Text } from "react-native";
import { MainLayout } from "@/components/shared/layout";

const News: React.FC = () => {
  return (
    <MainLayout title="News">
      <View>
        <Text>News here</Text>
      </View>
    </MainLayout>
  );
};

export default News;
