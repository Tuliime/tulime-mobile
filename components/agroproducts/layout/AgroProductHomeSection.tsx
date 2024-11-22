import React, { useCallback } from "react";
import { MainSectionLayout } from "@/components/shared/layout";
import { Dimensions, FlatList, View } from "react-native";
import { SIZES } from "@/constants";
import { TProduct } from "@/types/product";
import { ProductItem } from "@/components/agroproducts/UI";
import { agroProducts } from "@/data/agroProducts";

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const itemWidth = screenWidth / numColumns - SIZES.medium;

export const AgroProductHomeSection = () => {
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
    <MainSectionLayout title="Agro products" link="/agroproducts">
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
    </MainSectionLayout>
  );
};
