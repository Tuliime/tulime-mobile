import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { COLORS } from "@/constants";
import vacanciesJson from "@/data/vacancies.json";
import { VacancyCard } from "./VacancyCard";
import { TVacancy } from "@/types/vacancies";

const screenWidth = Dimensions.get("window").width * 0.999;

export const VacancyHomeSection: React.FC = () => {
  const tenders = vacanciesJson.vacancies;
  const flatListRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  const handleScroll = (event: any) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / screenWidth
    );
    setIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={tenders}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        renderItem={({ item }: { item: TVacancy["vacancy"] }) => (
          <View style={styles.tenderContainer}>
            <VacancyCard vacancy={item} />
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
  },
  vacancyTitle: {
    fontSize: 16,
    fontWeight: 500,
    color: COLORS.gray7,
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
