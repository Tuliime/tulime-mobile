import React, { ReactNode } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { COLORS, SIZES } from "@/constants";
import { Footer } from "@/components/shared/layout";
import { Header } from "./Header";

type MainLayoutProps = {
  children: ReactNode;
  title: string;
};

/** MainLayout is for authenticated screens */
export const MainLayout: React.FC<MainLayoutProps> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.green9}
        translucent={false}
      />
      <Header title={props.title} />
      <View style={styles.mainContent}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <View style={styles.contentContainer}>{props.children}</View>
        </ScrollView>
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
  },
});
