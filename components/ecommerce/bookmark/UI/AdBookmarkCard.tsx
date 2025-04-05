import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import { router } from "expo-router";

export const AdBookmarkCard: React.FC = () => {
  const navigateAdDetails = () => {
    router.push("/ecommerce/:someDynamicID");
  };

  // TODO: To add removal functionality
  // TODO: To add ad product status

  return (
    <TouchableOpacity style={styles.container} onPress={navigateAdDetails}>
      <Image
        source={{ uri: images[0].uri }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.bookmarkContent}>
        <Text style={styles.productName}>Rice</Text>
        <Text style={styles.productCreatedAt}>19/03</Text>
      </View>
      <TouchableOpacity style={styles.removeBookmarkContainer}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    gap: 16,
    position: "relative",
    backgroundColor: COLORS.gray3,
    padding: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.gray5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: COLORS.gray5,
  },
  bookmarkContent: {
    gap: 4,
  },
  productName: {
    color: COLORS.gray8,
    fontWeight: 600,
    fontSize: 20,
  },
  productCreatedAt: {
    color: COLORS.gray7,
    fontSize: 14,
  },
  removeBookmarkContainer: {
    position: "absolute",
    top: 8,
    right: 16,
  },
  removeText: {
    color: COLORS.red7,
    // fontWeight: 600,
    fontSize: 14,
  },
});

const images = [
  {
    id: 1,
    uri: "https://firebasestorage.googleapis.com/v0/b/reserve-now-677ca.appspot.com/o/tulime%2Frice.png?alt=media&token=d9fb8814-0d9a-40e0-8bca-ebec0782fe4a",
  },
];
