import React, { ReactNode } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { COLORS, SIZES } from "@/constants";
import { SecondaryHeader } from "./SecondaryHeader";

type SecondaryLayoutProps = {
  children: ReactNode;
  title: string;
};

/** SecondaryLayout is for authenticated screens */
export const SecondaryLayout: React.FC<SecondaryLayoutProps> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.green9}
        translucent={false}
      />
      <SecondaryHeader title={props.title} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View style={styles.contentContainer}>{props.children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    padding: SIZES.medium,
  },
});
