import { View, Text } from "react-native";
import React from "react";
import { MainLayout } from "@/components/shared/layout/MainLayout";

const FeedbackScreen = () => {
  return (
    <MainLayout title="Feedback">
      <View>
        <Text>Feedback list here</Text>
      </View>
    </MainLayout>
  );
};

export default FeedbackScreen;
