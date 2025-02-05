import React, { ReactNode } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { COLORS, SIZES } from "@/constants";
import { ChatroomHeader } from "./ChatroomHeader";

type ChatroomLayoutProps = {
  children: ReactNode;
  title: string;
  chatInputField: ReactNode;
};

/** ChatroomLayout is only for chatroom screens */
export const ChatroomLayout: React.FC<ChatroomLayoutProps> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.green9}
        translucent={false}
      />
      <ChatroomHeader title={props.title} />
      <View style={styles.mainContent}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <View style={styles.contentContainer}>{props.children}</View>
        </ScrollView>
        <View style={styles.chatInputFieldContainer}>
          {props.chatInputField}
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
    padding: SIZES.medium,
  },
  chatInputFieldContainer: {
    // padding: SIZES.medium,
  },
});
