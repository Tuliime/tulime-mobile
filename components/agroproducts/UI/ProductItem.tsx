import React from "react";
import { View, Image, Text } from "react-native";
import { TProduct } from "@/types/product";
import { SIZES, COLORS } from "@/constants";
import { truncateString, addCommasToNumber } from "@/utils";

export const ProductItem: React.FC<TProduct & { itemWidth: number }> = (
  props
) => {
  return (
    <View
      style={{
        width: props.itemWidth,
        backgroundColor: COLORS.white,
        borderRadius: 8,
      }}
    >
      <Image
        source={{ uri: `${props.image}` }}
        resizeMode="contain"
        style={{
          width: "100%",
          aspectRatio: "1/1",
          objectFit: "fill",
          padding: 4,
        }}
      />
      <View style={{ padding: SIZES.small, paddingTop: 0 }}>
        <Text>{truncateString(props.name)}</Text>
        <Text style={{ color: COLORS.primary, fontWeight: 500 }}>
          {`${props.currency} ${addCommasToNumber(props.price)}`}
        </Text>
      </View>
    </View>
  );
};
