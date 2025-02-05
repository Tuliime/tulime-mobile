import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type RightAngledTriangle = {
  style?: StyleProp<ViewStyle>;
};

export const RightAngledTriangle: React.FC<RightAngledTriangle> = (props) => {
  return <View style={[styles.triangle, props.style]} />;
};

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 0,
    // borderRightWidth: 100,
    // borderBottomWidth: 100,
    borderRightWidth: 16,
    borderBottomWidth: 16,
    borderStyle: "solid",
    borderRightColor: "transparent",
    borderBottomColor: "#37b24d", // Triangle color
  },
});
