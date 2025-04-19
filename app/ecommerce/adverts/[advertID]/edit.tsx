import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MainLayout } from "@/components/shared/layout/MainLayout";
import { useLocalSearchParams } from "expo-router";
import { UpdateAdvertImages } from "@/components/ecommerce/adverts/UI/UpdateAdvertImage";
import { useAdvertStore } from "@/store/advert";
import { UpdateAdvertBasicInfo } from "@/components/ecommerce/adverts/UI/UpdateAdvertBasicInfo";
import { UpdateAdvertPrice } from "@/components/ecommerce/adverts/UI/UpdateAdvertPrice";
import { UpdateAdvertInventory } from "@/components/ecommerce/adverts/UI/updateAdvertInventory";

const EditAdvert = () => {
  const { advertID } = useLocalSearchParams<{ advertID: string }>();
  const currentAdvert = useAdvertStore((state) => state.currentAdvert);

  return (
    <MainLayout title="Edit Ad">
      <View style={styles.container}>
        <UpdateAdvertImages images={currentAdvert.images} />
        <UpdateAdvertBasicInfo advert={currentAdvert} />
        <UpdateAdvertPrice advert={currentAdvert} />
        <UpdateAdvertInventory advert={currentAdvert} />
        {/* delete add here - optional */}
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    gap: 16,
  },
});

export default EditAdvert;
