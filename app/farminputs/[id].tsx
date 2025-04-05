import React from "react";
import { View, ActivityIndicator, StyleSheet, Image, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { farmInput } from "@/API/farmInputs";
import { useQuery } from "@tanstack/react-query";
import { TFarmInput } from "@/types/farmInput";
import { COLORS } from "@/constants";
import { ErrorCard } from "@/components/shared/UI/ErrorCard";
import { MaterialIcons } from "@expo/vector-icons";
import { truncateString } from "@/utils/truncateString";
import { addCommasToNumber } from "@/utils/addCommaNumber";
import { MainLayout } from "@/components/shared/layout/MainLayout";

const FarmInputDetailsScreen = () => {
  const { id }: TFarmInput["getById"] = useLocalSearchParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`farminputs-${id}`],
    queryFn: () => {
      return farmInput.getById({ id: id });
    },
  });

  const farmInputData: TFarmInput["farminput"] = data?.data ?? [];

  if (isPending) {
    return (
      <MainLayout title="Farm Input">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue7} />
        </View>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout title="Farm Input">
        <View style={styles.errorContainer}>
          <ErrorCard message={error.message} />
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={farmInputData.name}>
      <View style={{ gap: 16, flex: 1 }}>
        <View style={styles.card}>
          <Image
            resizeMode="contain"
            source={{ uri: farmInputData.imageUrl }}
            style={styles.image}
          />
          <View style={styles.cardContent}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>
                {truncateString(farmInputData.name, 28)}
              </Text>
            </View>
            <View style={styles.priceSourceContainer}>
              <Text style={styles.price}>
                {farmInputData.priceCurrency}{" "}
                {addCommasToNumber(farmInputData.price)}
              </Text>
              <View style={styles.SourceContainer}>
                <MaterialIcons
                  name="play-arrow"
                  size={24}
                  color={COLORS.green9}
                />
                <Text style={styles.source}>
                  {truncateString(farmInputData.Source, 15)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Purpose */}
        <View style={styles.purposeContainer}>
          <Text style={styles.purposeHeading}>Purpose</Text>
          <Text style={styles.purposeContent}>{farmInputData.purpose}</Text>
        </View>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noContentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noContentText: {
    textAlign: "center",
    fontSize: 14,
    color: COLORS.gray7,
  },
  image: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    width: "100%",
    aspectRatio: "4/3",
    objectFit: "fill",
    padding: 4,
  },
  card: {
    backgroundColor: COLORS.white,
    elevation: 5,
    borderRadius: 8,
  },
  cardContent: {
    padding: 16,
    gap: 16,
  },
  labelContainer: {
    width: "100%",
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
  priceSourceContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  SourceContainer: {
    width: 172,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  source: {
    textAlign: "center",
  },
  purposeContainer: {
    gap: 8,
  },
  purposeHeading: {
    fontWeight: 700,
    color: COLORS.gray7,
  },
  purposeContent: {
    fontSize: 14,
    color: COLORS.gray6,
  },
});

export default FarmInputDetailsScreen;
