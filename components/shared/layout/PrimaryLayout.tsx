import React, { ReactNode } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { router, Stack } from "expo-router";
import { COLORS, icons, SIZES } from "@/constants";
import { Footer } from "@/components/shared/layout";
import { PrimaryHeader } from "./PrimaryHeader";

const headerWidth = Dimensions.get("window").width * 0.999;

type PrimaryLayoutProps = {
  children: ReactNode;
};

export const PrimaryLayout: React.FC<PrimaryLayoutProps> = (props) => {
  const navigateToChatBot = () => {
    router.push("/chatbot");
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.green9}
        translucent={false}
      />
      <PrimaryHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>{props.children}</View>
      </ScrollView>
      <TouchableOpacity
        style={styles.botContainer}
        onPress={() => navigateToChatBot()}
      >
        <Image source={icons.bot} resizeMode="contain" style={styles.botIcon} />
      </TouchableOpacity>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray1,
    position: "relative",
  },
  headerStyle: {
    backgroundColor: COLORS.primary,
  },
  headerLeftContainer: {
    height: 120,
    width: headerWidth,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  contentContainer: {
    flex: 1,
    padding: SIZES.medium,
    position: "relative",
  },
  botContainer: {
    backgroundColor: COLORS.gray4,
    width: 44,
    height: 44,
    padding: 16,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 240,
    right: 8,
    zIndex: 100,
  },
  botIcon: {
    width: 24,
    height: 24,
    objectFit: "contain",
  },
});
