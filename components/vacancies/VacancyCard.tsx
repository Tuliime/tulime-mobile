import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import { router } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TVacancy } from "@/types/vacancies";
import Octicons from "@expo/vector-icons/Octicons";
import { AppDate } from "@/utils/appDate";

type VacancyCardProps = {
  vacancy: TVacancy["vacancy"];
};

export const VacancyCard: React.FC<VacancyCardProps> = (props) => {
  const navigateToVacancies = () => {
    router.push("/vacancies");
  };
  return (
    <TouchableOpacity style={styles.container} onPress={navigateToVacancies}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: props.vacancy.imageUrl }}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.vacancyBanner}>
          <Text style={styles.tenderBannerText}>Vacancy</Text>
        </View>
      </View>
      <View style={styles.tenderContentContainer}>
        <View style={styles.tenderPostedAtContainer}>
          <Text style={styles.tenderPostedAtText}>Deadline</Text>
          <View style={styles.tenderPostedAtElapseContainer}>
            <MaterialCommunityIcons
              name="timer-outline"
              size={24}
              color={COLORS.gray6}
            />
            <Text style={styles.tenderPostedAtText}>
              {new AppDate(props.vacancy.deadline).dayMonthYear()}
            </Text>
          </View>
        </View>
        <Text style={styles.vacancyTitle}>{props.vacancy.title}</Text>
        <Text style={styles.vacancyDescription}>
          {props.vacancy.description}
        </Text>
        <View style={styles.orgContainer}>
          <Octicons name="organization" size={24} color={COLORS.violet5} />
          <Text style={styles.orgText}>{props.vacancy.organization}</Text>
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
    borderColor: COLORS.violet7,
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
  vacancyBanner: {
    position: "absolute",
    top: 4,
    left: 4,
    backgroundColor: COLORS.violet9,
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
  vacancyTitle: {
    fontSize: 18,
    // fontWeight: 500,
    color: COLORS.gray8,
  },
  vacancyDescription: {
    fontSize: 14,
    color: COLORS.gray6,
  },
  orgContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  orgText: {
    flex: 1,
    color: COLORS.violet7,
    fontSize: 14,
    textAlign: "left",
  },
});
