import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { addCommasToNumber } from "@/utils/addCommaNumber";
import { TAdvert } from "@/types/advert";

type AdProductCardProps = {
  advert?: TAdvert["advert"];
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  priceCurrency: string;
};

// TODO: To display actual ad content,
// add bookmark functionality,
// use link for navigation
export const AdProductCard: React.FC<AdProductCardProps> = (props) => {
  const hasAdvert = !!props.advert?.id;
  const hasPrice = !!props.advert?.price?.amount;
  const priceCurrencyCode = JSON.parse(props.advert?.price?.currency!)
    ?.code as string;

  const navigateAdDetails = () => {
    if (hasAdvert) {
      router.push(`/ecommerce/adverts/${props.advert?.id}`);
      return;
    }
    router.push("/ecommerce/adverts/85ba2b54-a520-44ed-9cd9-3c7f68a4f8dd");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={navigateAdDetails}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: hasAdvert ? props.advert?.images[0]?.url : props.imageUrl,
          }}
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
        <Text style={styles.productName}>
          {hasAdvert ? props.advert?.productName : props.name}
        </Text>
        {hasPrice && (
          <Text
            style={styles.productPrice}
          >{`${priceCurrencyCode} ${addCommasToNumber(
            props.advert?.price?.amount!
          )}`}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
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
