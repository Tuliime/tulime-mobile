import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { PostAdvert } from "../UI/PostAdvert";
import { PostAdvertImages } from "../UI/PostAdvertImages";
import { PostAdvertPriceQuantityDelivery } from "../UI/PostAdvertPriceQuantityDelivery";
import { useGlobalSearchParams } from "expo-router";
import { COLORS } from "@/constants";

export const PostAdvertLayout = () => {
  const {
    postAdvertStep,
    advertID,
    productName,
  }: { postAdvertStep: string; advertID: string; productName: string } =
    useGlobalSearchParams();

  const steps = [
    { step: 1, title: "Step 1: Add advert basic information" },
    { step: 2, title: "Step 3: Upload pictures for the advert" },
    {
      step: 3,
      title: "Step 3: Add price, quantity and delivery",
    },
  ];

  const getAdvertStep = () => {
    if (!postAdvertStep) return 1;
    return parseInt(postAdvertStep);
  };

  const getAdvertStepTitle = (step: number) => {
    return steps.find((s) => s.step === step)?.title!;
  };

  return (
    <View style={styles.container}>
      {getAdvertStep() === 1 && (
        <View style={styles.postAdvertStepContainer}>
          <Text style={styles.postAdvertStepText}>{getAdvertStepTitle(1)}</Text>
          <PostAdvert />
        </View>
      )}
      {getAdvertStep() === 2 && (
        <View style={styles.postAdvertStepContainer}>
          <Text style={styles.postAdvertStepText}>{getAdvertStepTitle(2)}</Text>
          <PostAdvertImages />
        </View>
      )}
      {getAdvertStep() === 3 && (
        <View style={styles.postAdvertStepContainer}>
          <Text style={styles.postAdvertStepText}>{getAdvertStepTitle(3)}</Text>
          <PostAdvertPriceQuantityDelivery />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    gap: 16,
  },
  postAdvertStepContainer: {
    gap: 8,
  },
  postAdvertStepText: {
    fontSize: 18,
    color: COLORS.gray8,
    fontWeight: 500,
  },
});
