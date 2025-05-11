import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { COLORS } from "@/constants";
import tenderJson from "@/data/tenders.json";
import { TenderCard } from "./TenderCard";
import { TVacancy } from "@/types/vacancies";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

const screenWidth = Dimensions.get("window").width * 0.999;

export const TenderHomeSection: React.FC = () => {
  const tenders = tenderJson.tenders;
  const flatListRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  const handleScroll = (event: any) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / screenWidth
    );
    setIndex(newIndex);
  };

  const navigateToVacancies = () => {
    router.push("/vacancies");
  };

  return (
    <View style={styles.container}>
      <View style={styles.vacancyTitleContainer}>
        <View style={styles.vacancyTitleTextContainer}>
          <MaterialIcons name="work-outline" size={24} color={COLORS.gray7} />
          <Text style={styles.vacancyTitleText}>Vacancies and Tenders</Text>
        </View>
        <TouchableOpacity
          style={styles.viewAllContainer}
          onPress={navigateToVacancies}
        >
          <Text style={styles.viewAllText}> View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={tenders}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        renderItem={({ item }: { item: TVacancy["tender"] }) => (
          <View style={styles.tenderContainer}>
            <TenderCard tender={item} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  vacancyTitleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 8,
  },
  vacancyTitleTextContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 4,
    marginLeft: -18,
  },
  vacancyTitleText: {
    fontSize: 16,
    fontWeight: 500,
    color: COLORS.gray7,
  },

  viewAllContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: -16,
  },
  viewAllText: {
    color: COLORS.blue7,
    fontWeight: 500,
  },
  tenderContainer: {
    width: screenWidth - 32,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: COLORS.gray2,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
});
