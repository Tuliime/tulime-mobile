import { View, Text } from "react-native";
import React from "react";
import { MainLayout } from "@/components/shared/layout/MainLayout";
import { useLocalSearchParams } from "expo-router";

const EditAdvert = () => {
  const { advertID } = useLocalSearchParams<{ advertID: string }>();

  return (
    <MainLayout title="Edit Ad">
      <View>
        <Text>Edit advert</Text>
      </View>
    </MainLayout>
  );
};

export default EditAdvert;
