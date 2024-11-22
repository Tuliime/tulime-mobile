import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  Text,
} from "react-native";
import { COLORS, SIZES } from "../../../constants";

type ButtonProps = {
  label: ReactNode;
  handlePress: () => void;
  isTransparent?: boolean;
  isDisabled?: boolean;
  isActive?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Button: React.FC<ButtonProps> = (props) => {
  const { isTransparent, isDisabled, isActive, style, handlePress, label } =
    props;

  const transparentBgColor = "rgba(73,80,87,0.3)";
  const transparentActiveBgColor = "rgba(55,178,77,0.5)";
  const transparentTextColor = "#343a40";
  const transparentActiveTextColor = "#099268";
  const btnPrimaryColor = "#37b24d";
  const textColor = "#343a40";

  if (isTransparent) {
    return (
      <TouchableOpacity
        style={[
          {
            padding: 16,
            backgroundColor: isActive
              ? transparentActiveBgColor
              : transparentBgColor,
            borderRadius: SIZES.small / 1.25,
            justifyContent: "center",
            alignItems: "center",
          },
          style,
        ]}
        onPress={props.handlePress}
        disabled={isDisabled}
      >
        <Text
          style={{
            color: isActive ? transparentActiveTextColor : transparentTextColor,
            fontSize: SIZES.small,
            fontWeight: 900,
          }}
        >
          {props.label}
        </Text>
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
      <Text
        style={{ color: isActive ? transparentActiveTextColor : textColor }}
      >
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};
