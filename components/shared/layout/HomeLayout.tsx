import React, { ReactNode } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Stack } from "expo-router";
import { COLORS, SIZES } from "@/constants";
import { Footer } from "@/components/shared/layout";

type HomeLayoutProps = {
  children: ReactNode;
  header: ReactNode;
};

export const HomeLayout: React.FC<HomeLayoutProps> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.gray1}
        translucent={false}
      />
      <Stack.Screen
        options={{
          headerStyle: styles.headerStyle,
          headerShown: true,
          headerShadowVisible: false,
          headerLeft: () => <View>{props.header}</View>,
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>{props.children}</View>
      </ScrollView>
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
    backgroundColor: "#f8f9fa",
  },
  contentContainer: {
    flex: 1,
    padding: SIZES.medium,
  },
});
