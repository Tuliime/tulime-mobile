import React, { ReactNode } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, icons, SIZES } from "@/constants";
import { Footer } from "@/components/shared/layout";
import { MainHeader } from "./MainHeader";
import { router } from "expo-router";

type MainLayoutProps = {
  children: ReactNode;
  title: string;
};

/** MainLayout is for authenticated screens */
export const MainLayout: React.FC<MainLayoutProps> = (props) => {
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
      <MainHeader title={props.title} />
      <View style={styles.mainContent}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <View style={styles.contentContainer}>{props.children}</View>
        </ScrollView>
        <TouchableOpacity
          style={styles.botContainer}
          onPress={() => navigateToChatBot()}
        >
          <Image
            source={icons.bot}
            resizeMode="contain"
            style={styles.botIcon}
          />
        </TouchableOpacity>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray1,
  },
  mainContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  scrollContentContainer: {
    flexGrow: 1,
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
    borderRadius: 999,
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
