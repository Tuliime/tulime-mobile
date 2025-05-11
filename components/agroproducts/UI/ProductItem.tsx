import React from "react";
import { View, Image, Text } from "react-native";
import { TAgroproducts } from "@/types/product";
import { SIZES, COLORS } from "@/constants";
import { truncateString } from "@/utils/truncateString";
import { addCommasToNumber } from "@/utils/addCommaNumber";

export const ProductItem: React.FC<
  TAgroproducts["product"] & {
    itemWidth: number;
  }
> = (props) => {
  return (
    <View
      style={{
        width: props.itemWidth,
        backgroundColor: COLORS.white,
        borderRadius: 8,
        elevation: 5,
      }}
    >
      <Image
        source={{ uri: `${props.imageUrl}` }}
        resizeMode="contain"
        style={{
          width: "100%",
          aspectRatio: "4/3",
          objectFit: "fill",
          padding: 4,
        }}
      />
      <View style={{ padding: SIZES.small, paddingTop: 0 }}>
        <Text style={{ color: COLORS.gray8 }}>
          {truncateString(props.name)}
        </Text>
        <Text style={{ color: COLORS.primary, fontWeight: 600 }}>
          {`${props.Price[0].currency} ${addCommasToNumber(
            props.Price[0].amount
          )}`}
        </Text>
      </View>
    </View>
  );
};
