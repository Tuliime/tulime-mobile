import { COLORS, SIZES } from "@/constants";
import { router, Stack } from "expo-router";
import React from "react";
import {
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const headerWidth = Dimensions.get("window").width * 0.999;

type SecondaryHeaderProps = {
  title: string;
};

export const SecondaryHeader: React.FC<SecondaryHeaderProps> = (props) => {
  const navigateToBack = () => router.back();

  return (
    <Stack.Screen
      options={{
        headerStyle: styles.headerStyle,
        headerShown: true,
        headerShadowVisible: true,
        headerLeft: () => (
          <View style={styles.headerLeftContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={navigateToBack}
            >
              <FontAwesome6 name="arrow-left" size={20} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.titleContainer}>
              <Text style={styles.titleText}>{props.title}</Text>
            </TouchableOpacity>
          </View>
        ),
        headerTitle: "",
      }}
    />
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: COLORS.primary,
  },
  headerLeftContainer: {
    width: headerWidth,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 0,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: SIZES.small / 1.25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    width: "auto",
    borderRadius: SIZES.small / 1.25,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: SIZES.medium,
    fontWeight: "500",
    color: COLORS.white,
  },
});
