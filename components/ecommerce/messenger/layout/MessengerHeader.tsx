import { COLORS, icons, SIZES } from "@/constants";
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
import { truncateString } from "@/utils";
import { UserOnlineStatus } from "../UI/UserOnlineStatus";
import { useMessengerStore } from "@/store/messenger";
import { ProfileAvatar } from "@/components/shared/UI/ProfileAvatar";
import { Typing } from "../UI/Typing";

const headerWidth = Dimensions.get("window").width * 0.999;

type MessengerHeaderProps = {
  title: string;
};

export const MessengerHeader: React.FC<MessengerHeaderProps> = (props) => {
  const navigateToBack = () => router.back();
  const currentRecipient = useMessengerStore((state) => state.currentRecipient);

  // TODO: To change the header content depending on the current user (buyer or seller)

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
              <ProfileAvatar user={currentRecipient} />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.titleText}>
                {truncateString(props.title)}
              </Text>
              <View style={styles.onlineTypingContainer}>
                <UserOnlineStatus />
                <Typing />
              </View>
            </View>
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
    alignItems: "flex-start",
    gap: 0,
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginLeft: -16,
  },
  chatroomIconContainer: {
    alignSelf: "center",
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
    justifyContent: "flex-start",
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
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.gray7,
  },
  onlineTypingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
