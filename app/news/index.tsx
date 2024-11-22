import React from "react";
import { View, Text } from "react-native";
import { SecondaryLayout } from "@/components/shared/layout/SecondaryLayout";

const News: React.FC = () => {
  return (
    <SecondaryLayout title="News">
      <View>
        <Text>News here</Text>
      </View>
    </SecondaryLayout>
  );
};

export default News;
