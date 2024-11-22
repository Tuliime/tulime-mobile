import React, { useCallback } from "react";
import { View, Text, Dimensions, FlatList } from "react-native";
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
  // TODO: To get the active category from search params
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
            handlePress={() => {}}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Crops"
            isActive={true}
          />
          <Button
            handlePress={() => {}}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Livestock"
            isActive={false}
          />
          <Button
            handlePress={() => {}}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Poultry"
            isActive={false}
          />
          <Button
            handlePress={() => {}}
            isTransparent={true}
            style={{ borderRadius: 24, paddingVertical: 8 }}
            label="Fish"
            isActive={false}
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
