import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants";
import { TNews } from "@/types/news";
import { elapsedTime } from "@/utils/elapsedTime";
import { AppDate } from "@/utils/appDate";
import { truncateString } from "@/utils/truncateString";

export const NewsCard: React.FC<
  TNews["news"] & {
    itemWidth: number;
  }
> = (props) => {
  const postedAt = new AppDate(props.postedAt).monthDay();

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${props.imageUrl}` }}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.elapsedTimeContainer}>
          <Text style={styles.elapsedTimeText}>
            {elapsedTime(props.postedAt)}{" "}
          </Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.titleText}>{props.title}</Text>
        <View style={styles.categorySourceContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>
              {truncateString(props.category, 12)}
            </Text>
          </View>
          <View style={styles.sourceContainer}>
            <Text style={styles.sourceHeading}>Source:</Text>
            <Text style={styles.sourceText}>
              {truncateString(props.source, 15)}
            </Text>
          </View>
          <Text style={styles.postedAtText}>{postedAt}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: COLORS.gray1,
  },
  imageContainer: {
    width: "100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  elapsedTimeContainer: {
    backgroundColor: COLORS.teal7,
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: "absolute",
    top: 0,
    right: 0,
    borderBottomLeftRadius: 8,
  },
  elapsedTimeText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: 500,
  },
  image: {
    width: "100%",
    aspectRatio: "4/3",
    height: "auto",
    objectFit: "fill",
    padding: 4,
  },
  cardContent: {
    gap: 4,
    paddingTop: 4,
  },
  titleText: {
    textAlign: "left",
    fontSize: 18,
    color: COLORS.gray8,
  },
  categorySourceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
  },
  categoryContainer: {
    backgroundColor: COLORS.blue7,
    paddingLeft: 8,
    paddingRight: 16,
    paddingTop: 4,
    paddingBottom: 6,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  categoryText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 500,
    textAlign: "center",
  },
  sourceContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  sourceHeading: {
    color: COLORS.gray8,
    fontSize: 14,
  },
  sourceText: {
    color: COLORS.blue7,
    fontSize: 14,
  },
  postedAtText: {
    color: COLORS.gray6,
    fontSize: 16,
  },
});
