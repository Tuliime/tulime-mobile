import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TAdvert } from "@/types/advert";
import { COLORS } from "@/constants";
import { router } from "expo-router";
import { useAdvertStore } from "@/store/advert";
import Feather from "@expo/vector-icons/Feather";

type PostAdvertProgressProps = {
  advert: TAdvert["advert"];
  showDetails?: boolean;
};

const FIELD_LIST = [
  { keys: ["productName", "productDescription"], label: "Product Details" },
  { keys: ["images"], label: "Images" },
  { keys: ["price"], label: "Price" },
  { keys: ["inventory"], label: "Inventory" },
  { keys: ["isPublished"], label: "Published" },
] as const;

const TOTAL_STEPS = FIELD_LIST.length;

export const PostAdvertProgress: React.FC<PostAdvertProgressProps> = ({
  advert,
  showDetails,
}) => {
  const [showFullDetails, setShowFullDetails] = useState<boolean>(
    showDetails !== undefined ? showDetails : false
  );

  const updateCurrentAdvert = useAdvertStore(
    (state) => state.updateCurrentAdvert
  );

  const completedCount = FIELD_LIST.reduce<number>((count, field) => {
    const isComplete = field.keys.every((key) => {
      const value = (advert as any)[key];
      if (key === "images") {
        return Array.isArray(value) && value.length > 0;
      }
      if (key === "isPublished") {
        return value === true;
      }
      return value !== undefined && value !== null && value !== "";
    });
    return isComplete ? count + 1 : count;
  }, 0);

  const percent = Math.round((completedCount / TOTAL_STEPS) * 100);

  const navigateToFirstInCompleteStep = () => {
    const {
      productName,
      productDescription,
      images,
      price,
      inventory,
      isPublished,
      id,
    } = advert;

    updateCurrentAdvert(advert);

    // Step 1: Product details
    if (!productName || !productDescription) {
      router.push("/ecommerce/adverts/new");
      return;
    }

    // Step 2: Images
    if (!Array.isArray(images) || images.length === 0) {
      router.push(
        `/ecommerce/adverts/new?postAdvertStep=2&advertID=${id}&productName=${encodeURIComponent(
          productName
        )}`
      );
      return;
    }

    // Step 3: Price or Inventory
    if (!price || !inventory) {
      router.push(
        `/ecommerce/adverts/new?postAdvertStep=3&advertID=${id}&productName=${encodeURIComponent(
          productName
        )}&advertImage=${encodeURIComponent(images[0]?.url)}`
      );
      return;
    }

    // Step 4: Publish
    if (!isPublished) {
      router.push(
        `/ecommerce/adverts/new?postAdvertStep=4&advertID=${id}&productName=${encodeURIComponent(
          productName
        )}&advertImage=${encodeURIComponent(images[0]?.url)}`
      );
    }
  };

  const showFullDetailsHandler = () => {
    setShowFullDetails(() => !showFullDetails);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headerRow}
        onPress={navigateToFirstInCompleteStep}
      >
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.percentage}>{percent}%</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.barBackground}
        onPress={navigateToFirstInCompleteStep}
      >
        <View style={[styles.barFill, { width: `${percent}%` }]} />
      </TouchableOpacity>
      {/* Breakdown per field */}
      {showFullDetails && (
        <>
          {FIELD_LIST.map((field, idx) => {
            const isComplete = field.keys.every((key) => {
              const value = (advert as any)[key];
              if (key === "images") {
                return Array.isArray(value) && value.length > 0;
              }
              if (key === "isPublished") {
                return value === true;
              }
              return value !== undefined && value !== null && value !== "";
            });
            return (
              <TouchableOpacity
                key={idx}
                style={styles.fieldRow}
                onPress={navigateToFirstInCompleteStep}
              >
                <Text style={styles.fieldLabel}>{field.label}</Text>
                <Text style={styles.fieldStatus}>{isComplete ? "✓" : "—"}</Text>
              </TouchableOpacity>
            );
          })}
        </>
      )}
      <View style={styles.showDetailsContainer}>
        {!showFullDetails && (
          <TouchableOpacity
            onPress={showFullDetailsHandler}
            style={styles.showDetailsBtn}
          >
            <Text style={styles.showDetailsText}>Show more</Text>
            <Feather name="chevron-down" size={20} color={COLORS.gray6} />
          </TouchableOpacity>
        )}
        {showFullDetails && (
          <TouchableOpacity
            onPress={showFullDetailsHandler}
            style={styles.showDetailsBtn}
          >
            <Text style={styles.showDetailsText}>Show less</Text>
            <Feather name="chevron-up" size={20} color={COLORS.gray6} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 12,
    // paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  percentage: {
    fontSize: 16,
    fontWeight: "600",
  },
  barBackground: {
    width: "100%",
    height: 8,
    backgroundColor: COLORS.gray4,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
  },
  barFill: {
    height: "100%",
    backgroundColor: COLORS.green6,
  },
  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  fieldLabel: {
    fontSize: 14,
  },
  fieldStatus: {
    fontSize: 14,
  },
  showDetailsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  showDetailsBtn: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  showDetailsText: {
    color: COLORS.gray6,
  },
});
