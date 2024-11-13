import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

type ScreenHeaderBtnProps = {
  iconUrl: any;
  dimension: number;
  handlePress: () => void;
};

export const ScreenHeaderBtn: React.FC<ScreenHeaderBtnProps> = (props) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.small / 1.25,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={props.handlePress}
    >
      <Image
        source={props.iconUrl}
        resizeMode="cover"
        style={{
          width: props.dimension,
          height: props.dimension,
          borderRadius: SIZES.small / 1.25,
        }}
      />
    </TouchableOpacity>
  );
};

// const styles = StyleSheet.create({
//   btnContainer: {
//     width: 40,
//     height: 40,
//     backgroundColor: COLORS.white,
//     borderRadius: SIZES.small / 1.25,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   btnImg: (dimension) => ({
//     width: dimension,
//     height: dimension,
//     borderRadius: SIZES.small / 1.25,
//   }),
// });
