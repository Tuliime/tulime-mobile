import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import { router } from "expo-router";

type ModuleCardProp = {
  name: string;
  description: string;
  icon: any;
  link?: any;
};

export const ModuleCard: React.FC<ModuleCardProp> = (props) => {
  const navigateToPostAdvert = () => {
    router.push("/ecommerce/adverts/new");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToPostAdvert}>
      <Image source={props.icon} resizeMode="contain" style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>{props.name}</Text>
        <Text style={styles.contentDescription}>{props.description}</Text>
      </View>
    </TouchableOpacity>
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
