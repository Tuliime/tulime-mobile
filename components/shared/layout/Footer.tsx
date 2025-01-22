import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import { COLORS, SIZES } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

const width = Dimensions.get("window").width * 0.999;

export const Footer: React.FC = () => {
  const navigateToHome = () => router.push("/home");

  {
    /* TODO: To mark active action */
  }

  return (
    <View style={styles.footerContainer}>
      {/* TODO: To test link on other screens apart from home */}
      {/* <Link style={{ alignItems: "center" }} href="/home">
        <Ionicons name="home-outline" size={20} color={COLORS.gray8} />
        <Text style={{ fontSize: 12, color: COLORS.gray8 }}>Home</Text>
      </Link> */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={(_) => navigateToHome()}
      >
        <Ionicons name="home-outline" size={20} color={COLORS.gray8} />
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="globe-outline" size={20} color={COLORS.gray8} />
        <Text style={styles.iconText}>Language</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="menu-outline" size={20} color={COLORS.gray8} />
        <Text style={styles.iconText}>More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: width,
    paddingVertical: SIZES.xxSmall,
    paddingHorizontal: SIZES.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.gray3,
    borderTopColor: COLORS.gray4,
    borderTopWidth: 1,
  },
  iconContainer: {
    alignItems: "center",
  },
  iconText: {
    fontSize: 12,
    color: COLORS.gray8,
  },
});
