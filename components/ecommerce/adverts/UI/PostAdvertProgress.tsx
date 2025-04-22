import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TAdvert } from "@/types/advert";
import { COLORS } from "@/constants";

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
  const showFullDetails = showDetails !== undefined ? showDetails : false;

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

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.percentage}>{percent}%</Text>
      </View>

      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${percent}%` }]} />
      </View>
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
              <View key={idx} style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>{field.label}</Text>
                <Text style={styles.fieldStatus}>{isComplete ? "✓" : "—"}</Text>
              </View>
            );
          })}
        </>
      )}
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
});
