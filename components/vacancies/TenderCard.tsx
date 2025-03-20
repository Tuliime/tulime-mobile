import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES } from "@/constants";
import { router } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { elapsedTime } from "@/utils/elapsedTime";
import { TVacancy } from "@/types/vacancies";
import Octicons from "@expo/vector-icons/Octicons";

type TenderCardProps = {
  tender: TVacancy["tender"];
};

export const TenderCard: React.FC<TenderCardProps> = (props) => {
  const navigateToVacancies = () => {
    router.push("/vacancies");
  };
  return (
    <TouchableOpacity style={styles.container} onPress={navigateToVacancies}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: props.tender.imageUrl }}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.tenderBanner}>
          <Text style={styles.tenderBannerText}>Tender</Text>
        </View>
      </View>
      <View style={styles.tenderContentContainer}>
        <View style={styles.tenderPostedAtContainer}>
          <Text style={styles.tenderPostedAtText}>Posted</Text>
          <View style={styles.tenderPostedAtElapseContainer}>
            <MaterialCommunityIcons
              name="timer-outline"
              size={24}
              color={COLORS.gray6}
            />
            <Text style={styles.tenderPostedAtText}>
              {elapsedTime(props.tender.createdAt)}
            </Text>
          </View>
        </View>
        <Text style={styles.tenderTitle}>{props.tender.title}</Text>
        <View style={styles.orgContainer}>
          <Octicons name="organization" size={24} color={COLORS.blue7} />
          <Text style={styles.orgText}>{props.tender.organization}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.blue5,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: COLORS.gray3,
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
  tenderBanner: {
    position: "absolute",
    top: 4,
    left: 4,
    backgroundColor: COLORS.gray9,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  tenderBannerText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 500,
  },
  tenderContentContainer: {
    width: "100%",
    justifyContent: "center",
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  tenderPostedAtContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tenderPostedAtText: {
    fontSize: 14,
    color: COLORS.gray6,
  },
  tenderPostedAtElapseContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  tenderTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: COLORS.gray8,
  },
  orgContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  orgText: {
    flex: 1,
    color: COLORS.blue7,
    fontSize: 14,
    textAlign: "left",
  },
});
