import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { router } from "expo-router";
import { MainLayout } from "@/components/shared/layout";
import { COLORS, SIZES } from "@/constants";
import { TAgroproducts } from "@/types/product";
import { agroProduct } from "@/API/agroProducts";
import { useQuery } from "@tanstack/react-query";
import { isArrayWithElements } from "@/utils/isArrayWithElements";
import { ErrorCard } from "@/components/shared/UI/ErrorCard";
import { Button } from "@/components/shared/UI/Button";
import { ProductItem } from "@/components/agroproducts/UI/ProductItem";

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const itemWidth = screenWidth / numColumns - SIZES.medium;

const Agroproducts: React.FC = () => {
  const { category }: { category: string } = useGlobalSearchParams();

  const [activeCategory, setActiveCategory] = useState(
    !!category ? category : "crop"
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
    queryKey: [`agroproducts-category-${activeCategory}`],
    queryFn: () => {
      return agroProduct.get({
        limit: 20,
        category: activeCategory,
        cursor: "",
      });
    },
  });

  const agroProducts: TAgroproducts["product"][] = data?.data ?? [];
  const hasAgroProducts = isArrayWithElements(agroProducts);

  const renderProductItem = useCallback(
    ({ item }: { item: TAgroproducts["product"] }) => {
      return (
        <View style={{ width: itemWidth, margin: 2 }}>
          <ProductItem
            id={item.id}
            name={item.name}
            category={item.category}
            imageUrl={item.imageUrl}
            Price={item.Price}
            itemWidth={itemWidth}
          />
        </View>
      );
    },
    []
  );

  if (isPending) {
    return (
      <MainLayout title="Agro Products">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue7} />
        </View>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout title="Agro Products">
        <View style={styles.errorContainer}>
          <ErrorCard message={error.message} />
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Agro Products">
      <View style={{ gap: 16 }}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Button
            handlePress={() => setCategory("crop")}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Crops"
            isActive={isActiveCategory("crop")}
          />
          <Button
            handlePress={() => setCategory("livestock")}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Livestock"
            isActive={isActiveCategory("livestock")}
          />
          <Button
            handlePress={() => setCategory("poultry")}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Poultry"
            isActive={isActiveCategory("poultry")}
          />
          <Button
            handlePress={() => setCategory("fish")}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Fish"
            isActive={isActiveCategory("fish")}
          />
        </View>
        {hasAgroProducts && (
          <FlatList
            data={agroProducts!}
            keyExtractor={(item) => item.id}
            renderItem={renderProductItem}
            scrollEnabled={false}
            numColumns={numColumns}
            contentContainerStyle={{
              justifyContent: "center",
              columnGap: SIZES.medium,
              backgroundColor: "",
            }}
          />
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
});

export default Agroproducts;
