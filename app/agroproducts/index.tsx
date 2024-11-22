import React, { useCallback, useState } from "react";
import { View, Text, Dimensions, FlatList } from "react-native";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { SecondaryLayout } from "@/components/shared/layout/SecondaryLayout";
import { Button } from "@/components/shared/UI";
import { SIZES } from "@/constants";
import { TProduct } from "@/types/product";
import { ProductItem } from "@/components/agroproducts/UI";
import { agroProducts } from "@/data/agroProducts";

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const itemWidth = screenWidth / numColumns - SIZES.medium;

const Agroproducts: React.FC = () => {
  const { category } = useGlobalSearchParams();
  // const { category } = useLocalSearchParams();

  const [activeCategory, _] = useState(!!category ? category : "crop");

  const navigateToNewCategory = (category: string) => {
    router.push(`/agroproducts?category=${category}`);
  };

  const isActiveCategory = (category: string) => {
    return activeCategory === `${category}`;
  };

  // TODO: To research updating search params without screen navigation

  const renderProductItem = useCallback(({ item }: { item: TProduct }) => {
    return (
      <View style={{ width: itemWidth, margin: 2 }}>
        <ProductItem
          id={item.id}
          name={item.name}
          category={item.category}
          image={item.image}
          price={item.price}
          currency={item.currency}
          itemWidth={itemWidth}
        />
      </View>
    );
  }, []);

  return (
    <SecondaryLayout title="Agro Products">
      <View style={{ gap: 16 }}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Button
            handlePress={() => navigateToNewCategory("crop")}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Crops"
            isActive={isActiveCategory("crop")}
          />
          <Button
            handlePress={() => navigateToNewCategory("livestock")}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Livestock"
            isActive={isActiveCategory("livestock")}
          />
          <Button
            handlePress={() => navigateToNewCategory("poultry")}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Poultry"
            isActive={isActiveCategory("poultry")}
          />
          <Button
            handlePress={() => navigateToNewCategory("fish")}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Fish"
            isActive={isActiveCategory("fish")}
          />
        </View>
        <FlatList
          data={agroProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderProductItem}
          scrollEnabled={false}
          numColumns={numColumns}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            columnGap: SIZES.medium,
            backgroundColor: "",
          }}
        />
      </View>
    </SecondaryLayout>
  );
};

export default Agroproducts;
