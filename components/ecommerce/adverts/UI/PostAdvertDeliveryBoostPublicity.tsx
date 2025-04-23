import React from "react";
import { View, StyleSheet } from "react-native";
import { AdvertPublicityLayout } from "../layout/AdvertPublicityLayout";
import { useAdvertStore } from "@/store/advert";

export const PostAdvertDeliveryBoostPublicity: React.FC = () => {
  const currentAdvert = useAdvertStore((state) => state.currentAdvert);

  return (
    <View style={styles.container}>
      {/* Delivery */}
      {/* Boost */}
      <AdvertPublicityLayout advert={currentAdvert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});
