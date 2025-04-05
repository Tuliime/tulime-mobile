import React, { useCallback, useState } from "react";
import {
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { router } from "expo-router";
import { COLORS, SIZES } from "@/constants";
import { farmInput } from "@/API/farmInputs";
import { useQuery } from "@tanstack/react-query";
import { isArrayWithElements } from "@/utils/isArrayWithElements";
import { ErrorCard } from "@/components/shared/UI/ErrorCard";
import { TFarmInput } from "@/types/farmInput";
import { FarmInputCard } from "@/components/farminputs/UI/FarmInputCard";
import { Button } from "@/components/shared/UI/Button";
import { MainLayout } from "@/components/shared/layout/MainLayout";

const screenWidth = Dimensions.get("window").width * 0.98;
const numColumns = 2;
const itemWidth = screenWidth / numColumns - SIZES.medium;

const FarmInputs: React.FC = () => {
  const { category }: { category: string } = useGlobalSearchParams();

  const [activeCategory, setActiveCategory] = useState(
    !!category ? category : "fertilizer"
  );

  const setCategory = (category: string) => {
    router.setParams({ category });
    setActiveCategory(category);
  };

  const isActiveCategory = (category: string) => {
    return activeCategory === `${category}`;
  };

  // TODO: To define logic for the cursor based pagination
  const { isPending, isError, data, error } = useQuery({
    queryKey: [`farminputs-category-${activeCategory}`],
    queryFn: () => {
      return farmInput.get({
        limit: 20,
        category: activeCategory,
        cursor: "",
      });
    },
  });

  const farmInputs: TFarmInput["farminput"][] = data?.data ?? [];
  const hasFarmInputs = isArrayWithElements(farmInputs);

  const renderFarmInputs = useCallback(
    ({ item }: { item: TFarmInput["farminput"] }) => {
      return (
        <View style={{ width: itemWidth, margin: 2 }}>
          <FarmInputCard
            id={item.id}
            name={item.name}
            category={item.category}
            imageUrl={item.imageUrl}
            itemWidth={itemWidth}
            purpose={item.purpose}
            imagePath={item.imagePath}
            price={item.price}
            priceCurrency={item.priceCurrency}
            Source={item.Source}
            sourceUrl={item.sourceUrl}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
          />
        </View>
      );
    },
    []
  );

  if (isPending) {
    return (
      <MainLayout title="Farms Inputs & Machinery">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue7} />
        </View>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout title="Farms Inputs & Machinery">
        <View style={styles.errorContainer}>
          <ErrorCard message={error.message} />
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Farms Inputs & Machinery">
      <View style={{ gap: 16, flex: 1 }}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Button
            handlePress={() => setCategory("fertilizer")}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Fertilizers"
            isActive={isActiveCategory("fertilizer")}
          />
          <Button
            handlePress={() => setCategory("vaccines")}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Vaccines"
            isActive={isActiveCategory("vaccines")}
          />
          <Button
            handlePress={() => setCategory("pesticides")}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Pesticides"
            isActive={isActiveCategory("pesticides")}
          />
          <Button
            handlePress={() => setCategory("machinery")}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Machinery"
            isActive={isActiveCategory("machinery")}
          />
        </View>
        {hasFarmInputs && (
          <FlatList
            data={farmInputs!}
            keyExtractor={(item) => item.id}
            renderItem={renderFarmInputs}
            scrollEnabled={false}
            numColumns={numColumns}
            contentContainerStyle={{
              justifyContent: "center",
              columnGap: SIZES.medium,
              backgroundColor: "",
            }}
          />
        )}
        {!hasFarmInputs && (
          <View style={styles.noContentContainer}>
            <Text style={styles.noContentText}>
              {` No data for ${activeCategory}`}
            </Text>
          </View>
        )}
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
});

export default FarmInputs;
