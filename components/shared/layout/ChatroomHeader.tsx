import { COLORS, icons, SIZES } from "@/constants";
import { router, Stack } from "expo-router";
import React from "react";
import {
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Typing } from "@/components/chatroom/Typing";
import { ChatroomUsers } from "@/components/chatroom/ChatroomUsers";

const headerWidth = Dimensions.get("window").width * 0.999;

type ChatroomHeaderProps = {
  title: string;
};

export const ChatroomHeader: React.FC<ChatroomHeaderProps> = (props) => {
  const navigateToBack = () => router.back();
  const navigateToSearch = () => router.push("/search");

  return (
    <Stack.Screen
      options={{
        headerStyle: styles.headerStyle,
        headerShown: true,
        headerShadowVisible: true,
        headerLeft: () => (
          <View style={styles.headerLeftContainer}>
            <View style={styles.chatroomIconContainer}>
              <TouchableOpacity
                style={styles.leftArrowIconButton}
                onPress={navigateToBack}
              >
                <FontAwesome6
                  name="arrow-left"
                  size={20}
                  color={COLORS.gray8}
                />
              </TouchableOpacity>
              <Image
                source={icons.logoTemp}
                resizeMode="contain"
                style={styles.chatroomIcon}
              />
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.typingContainer}>
                <Text style={styles.titleText}>{props.title}</Text>
                <Typing />
              </View>
              <View style={styles.chatroomUsersContainer}>
                <ChatroomUsers />
              </View>
            </View>
            <TouchableOpacity
              style={styles.leftArrowIconButton}
              onPress={navigateToSearch}
            >
              <MaterialIcons name="search" size={24} color={COLORS.gray8} />
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
    backgroundColor: COLORS.gray1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerLeftContainer: {
    width: headerWidth,
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 0,
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginLeft: -16,
  },
  chatroomIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  chatroomIcon: {
    width: 44,
    height: 44,
    objectFit: "contain",
    marginLeft: -4,
  },
  leftArrowIconButton: {
    width: 36,
    height: 36,
    borderRadius: SIZES.small / 1.25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingLeft: 8,
    flex: 1,
    alignItems: "flex-start",
  },
  titleContainer: {
    width: "auto",
    borderRadius: SIZES.small / 1.25,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.gray7,
  },
  chatroomUsersContainer: {},
});
