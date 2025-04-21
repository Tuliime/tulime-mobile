import { View, StyleSheet } from "react-native";
import React from "react";
import { PostAdvertPrice } from "./PostAdvertPrice";
import { PostAdvertInventory } from "./PostAdvertInventory";

export const PostAdvertPriceQuantityDelivery: React.FC = () => {
  // TO add steps for these forms and disable the next until success of current one

  return (
    <View style={styles.container}>
      <PostAdvertPrice />
      <PostAdvertInventory />
      {/* Advert delivery option */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    gap: 16,
  },
});
