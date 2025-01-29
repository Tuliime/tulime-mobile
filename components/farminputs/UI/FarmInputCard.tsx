import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TFarmInput } from "@/types/farmInput";
import { COLORS } from "@/constants";
import { addCommasToNumber, truncateString } from "@/utils";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";

type FarmInputCardProps = TFarmInput["farminput"] & {
  itemWidth: number;
};

export const FarmInputCard: React.FC<FarmInputCardProps> = (props) => {
  const navigateToProductDetails = () => {
    router.push(`/farminputs/${props.id}`);
  };

  const navigateToProductSource = () => {
    router.push(`/${props.sourceUrl}` as any);
  };

  return (
    <View style={[styles.card, { width: props.itemWidth }]}>
      <Image
        resizeMode="contain"
        source={{ uri: props.imageUrl }}
        style={styles.image}
      />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{truncateString(props.name, 10)}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.price}>
          {props.priceCurrency} {addCommasToNumber(props.price)}
        </Text>
        <View style={styles.sourceContainer}>
          <MaterialIcons name="play-arrow" size={24} color={COLORS.green9} />
          <Text style={styles.source}>{truncateString(props.Source, 15)}</Text>
        </View>
        <TouchableOpacity
          style={styles.purposeContainer}
          onPress={navigateToProductSource}
        >
          <Text style={styles.purposeHeading} numberOfLines={2}>
            Purpose
          </Text>
          <Text style={styles.purposeContent} numberOfLines={2}>
            {truncateString(props.purpose, 28)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.moreContainer}
          onPress={navigateToProductDetails}
        >
          <Text style={styles.moreText}>More</Text>
          <Feather name="chevrons-right" size={24} color={COLORS.blue7} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    elevation: 5,
    alignItems: "center",
    shadowColor: COLORS.gray8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    gap: 8,
  },
  image: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    width: "100%",
    aspectRatio: "4/3",
    objectFit: "fill",
    padding: 4,
  },
  labelContainer: {
    width: "90%",
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    padding: 8,
  },
  label: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  contentContainer: {
    // backgroundColor: "purple",
    width: "100%",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  price: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "left",
  },
  sourceContainer: {
    flexDirection: "row",
    // alignItems: "flex-start",
    alignItems: "center",
    marginLeft: -8,
  },
  source: {
    color: COLORS.gray8,
    fontSize: 14,
  },
  purposeContainer: {
    justifyContent: "flex-start",
    gap: 4,
  },
  purposeHeading: {
    color: COLORS.gray7,
    fontWeight: 500,
    fontSize: 14,
    textAlign: "left",
  },
  purposeContent: {
    color: COLORS.gray6,
    fontSize: 14,
    textAlign: "left",
  },
  moreContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginTop: 4,
  },
  moreText: {
    color: COLORS.blue7,
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 4,
  },
});
