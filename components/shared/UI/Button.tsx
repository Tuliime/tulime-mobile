import React, { ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../../constants";

type ButtonProps = {
  label: ReactNode;
  handlePress: () => void;
  isTransparent?: boolean;
  isDisabled?: boolean;
  isActive?: boolean;
};

export const Button: React.FC<ButtonProps> = (props) => {
  const isDisabled = props.isDisabled;
  const isActive = props.isDisabled;
  const transparentColor = "rgba(51,214,159,0.1)";
  const transparentActiveColor = "rgba(206,212,218,0.1)";
  const btnPrimaryColor = "#37b24d";
  const isTransparent = props.isTransparent;

  if (isTransparent) {
    return (
      <TouchableOpacity
        style={{
          padding: 16,
          backgroundColor: isActive ? transparentActiveColor : transparentColor,
          borderRadius: SIZES.small / 1.25,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={props.handlePress}
        disabled={isDisabled}
      >
        <View>{props.label}</View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        backgroundColor: btnPrimaryColor,
        borderRadius: SIZES.small / 1.25,
        justifyContent: "center",
        alignItems: "center",
        opacity: isDisabled ? 50 : 100,
      }}
      onPress={props.handlePress}
      disabled={isDisabled}
    >
      <View>{props.label}</View>
    </TouchableOpacity>
  );
};
