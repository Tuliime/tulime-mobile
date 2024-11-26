import React, { useCallback, useState } from "react";
import { View, Text, Dimensions, FlatList } from "react-native";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { SecondaryLayout } from "@/components/shared/layout/SecondaryLayout";
import { Button } from "@/components/shared/UI";
import { SIZES } from "@/constants";
import { TProduct } from "@/types/product";
import { ProductItem } from "@/components/agroproducts/UI";
import { useGetAgroProducts } from "@/hooks/useGetAgroProducts";

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const itemWidth = screenWidth / numColumns - SIZES.medium;

const Agroproducts: React.FC = () => {
  const { category }: { category: string } = useGlobalSearchParams();
  // const { category } = useLocalSearchParams();

  const [activeCategory, setActiveCategory] = useState(
    !!category ? category : "crop"
  );

  const { getByCategory } = useGetAgroProducts();
  const agroProducts = getByCategory(activeCategory);

  const setCategory = (category: string) => {
    router.setParams({ category });
    setActiveCategory(category);
  };

  const isActiveCategory = (category: string) => {
    return activeCategory === `${category}`;
  };

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
