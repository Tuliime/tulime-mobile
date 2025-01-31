import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants";

type DefaultUserProfileIconProps = {
  profileBgColor: string;
  name: string;
};

export const DefaultUserProfileBgIcon: React.FC<DefaultUserProfileIconProps> = (
  props
) => {
  const firstNameChar = props.name.charAt(0).toUpperCase();

  return (
    <View style={[styles.container, { backgroundColor: props.profileBgColor }]}>
      <Text style={styles.text}>{firstNameChar}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 44,
    borderRadius: 10000,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 500,
  },
});
