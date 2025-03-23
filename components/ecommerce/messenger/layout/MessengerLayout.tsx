import React, { ReactNode } from "react";
import { View, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { COLORS, SIZES } from "@/constants";
import { MessengerHeader } from "./MessengerHeader";

type MessengerLayoutProps = {
  children: ReactNode;
  title: string;
  messengerInputField: ReactNode;
};

/** MessengerLayout is only for e-commerce messenger screens */
export const MessengerLayout: React.FC<MessengerLayoutProps> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.green9}
        translucent={false}
      />
      <MessengerHeader title={props.title} />
      <View style={styles.mainContent}>
        <View style={styles.contentContainer}>{props.children}</View>
        <View style={styles.chatInputFieldContainer}>
          {props.messengerInputField}
        </View>
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
    paddingHorizontal: SIZES.medium,
  },
  chatInputFieldContainer: {},
});
