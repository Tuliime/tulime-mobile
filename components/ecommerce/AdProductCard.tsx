import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { addCommasToNumber } from "@/utils";
import { router } from "expo-router";

type AdProductCardProps = {
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  priceCurrency: string;
};

export const AdProductCard: React.FC<AdProductCardProps> = (props) => {
  const navigateAdDetails = () => {
    router.push("/ecommerce/:someDynamicID");
  };
  return (
    <TouchableOpacity style={styles.container} onPress={navigateAdDetails}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: props.imageUrl }}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.bookmarkIconContainer}>
          {/* <Ionicons
            name="bookmark"
            size={24}
            color={COLORS.primary}
            style={styles.bookmarkIcon}
          /> */}
          <Ionicons
            name="bookmark-outline"
            size={24}
            color={COLORS.primary}
            style={styles.bookmarkIcon}
          />
        </View>
      </View>
      <View style={styles.productContainer}>
        <Text style={styles.productName}>{props.name}</Text>
        <Text style={styles.productPrice}>{`${
          props.priceCurrency
        } ${addCommasToNumber(parseInt(props.price))}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    // borderWidth: 2,
    // borderColor: COLORS.primary,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    gap: 8,
    elevation: 5,
  },
  productContainer: {
    width: "100%",
    justifyContent: "center",
    padding: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.gray8,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 500,
    color: COLORS.primary,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: COLORS.gray2,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  image: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    width: "100%",
    aspectRatio: "4/3",
    objectFit: "fill",
  },
  bookmarkIconContainer: {
    position: "absolute",
    bottom: -16,
    right: 8,
    width: 36,
    height: 36,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    elevation: 3,
  },
  bookmarkIcon: {},
});
