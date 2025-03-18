import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { COLORS } from "@/constants";

type ModuleCardProp = {
  name: string;
  description: string;
  icon: any;
};

export const ModuleCard: React.FC<ModuleCardProp> = (props) => {
  return (
    <View style={styles.container}>
      <Image source={props.icon} resizeMode="contain" style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>{props.name}</Text>
        <Text style={styles.contentDescription}>{props.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    padding: 4,
    gap: 8,
    elevation: 5,
    width: 240,
    height: 96,
  },
  contentContainer: {
    justifyContent: "center",
    flex: 1,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 500,
    color: COLORS.gray7,
  },
  contentDescription: {
    fontSize: 12,
    fontWeight: 400,
    color: COLORS.gray7,
  },
  image: {
    width: 64,
  },
});
