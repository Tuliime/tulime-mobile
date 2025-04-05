import { TChatbot } from "@/types/chatbot";
import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { COLORS, icons } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AppDate } from "@/utils/appDate";
import { useAuthStore } from "@/store/auth";
import { DefaultUserProfileBgIcon } from "@/components/settings/DefaultUserProfileIcon";

const screenWidth = Dimensions.get("window").width * 0.98;
const maxWidth = screenWidth * 0.88;

export const UserMessage: React.FC<TChatbot["message"]> = (props) => {
  const messageTime = new AppDate(props.postedAt!).time();
  const user = useAuthStore((state) => state.auth.user);

  const hasImage: boolean = !!user.imageUrl;
  const hasProfileBgColor: boolean = !!user.profileBgColor;

  const showProfileImage: boolean = hasImage;
  const showProfileBgColor: boolean = !hasImage && hasProfileBgColor;
  const showDefaultProfileImage: boolean = !hasImage && !hasProfileBgColor;

  return (
    <View style={styles.Container}>
      {showProfileImage && (
        <View style={styles.userIconContainer}>
          <Image
            source={{ uri: user.imageUrl }}
            resizeMode="contain"
            style={styles.userIcon}
          />
        </View>
      )}
      {showProfileBgColor && (
        <View style={styles.userIconContainer}>
          <DefaultUserProfileBgIcon
            profileBgColor={user.profileBgColor}
            name={user.name}
          />
        </View>
      )}
      {showDefaultProfileImage && (
        <View style={styles.profileImageContainer}>
          <Image
            source={icons.profile}
            resizeMode="contain"
            style={styles.profileImage}
          />
        </View>
      )}
      <View style={styles.messageContainer}>
        <AntDesign
          name="caretup"
          size={24}
          color={COLORS.primary}
          style={styles.triangleIcon}
        />
        <Text style={styles.messageText}>{props.message}</Text>
        <Text style={styles.messageTime}>{messageTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    gap: 8,
    alignItems: "flex-end",
  },
  userIconContainer: {
    backgroundColor: COLORS.gray4,
    width: 44,
    height: 44,
    padding: 16,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  userIcon: {
    width: 44,
    height: 44,
    borderRadius: 1000,
    objectFit: "contain",
  },
  profileImageContainer: {
    width: "auto",
    height: "auto",
    backgroundColor: COLORS.gray3,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: COLORS.gray4,
  },
  profileImage: {
    width: 44,
    height: 44,
  },
  messageContainer: {
    width: "auto",
    maxWidth: maxWidth,
    backgroundColor: COLORS.primary,
    padding: 16,
    paddingBottom: 28,
    borderRadius: 12,
    position: "relative",
  },
  triangleIcon: {
    position: "absolute",
    right: 12,
    top: -10,
  },
  messageText: {
    color: COLORS.white,
    fontSize: 16,
  },
  messageTime: {
    color: COLORS.gray4,
    position: "absolute",
    right: 12,
    bottom: 8,
  },
});
