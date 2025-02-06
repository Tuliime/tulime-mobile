import React from "react";
import { COLORS, icons } from "@/constants";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { AppDate } from "@/utils/appDate";
import { useAuthStore } from "@/store/auth";
import { DefaultUserProfileBgIcon } from "@/components/settings/DefaultUserProfileIcon";
import { TChatroom } from "@/types/chatroom";
import { RightAngledTriangle } from "../shared/icons/RightAngledTriangle";

const screenWidth = Dimensions.get("window").width * 0.98;
const maxWidth = screenWidth * 0.76;

type SenderMessageProps = {
  message: TChatroom["organizedMessage"];
};

export const SenderMessage: React.FC<SenderMessageProps> = (props) => {
  const messageTime = new AppDate(props.message.arrivedAt!).time();
  const user = useAuthStore((state) => state.auth.user);

  const hasImage: boolean = !!user.imageUrl;
  const hasProfileBgColor: boolean = !!user.profileBgColor;
  const isPrimaryMessage: boolean = props.message.isPrimaryMessage;

  const showProfileImage: boolean = hasImage;
  const showProfileBgColor: boolean = !hasImage && hasProfileBgColor;
  const showDefaultProfileImage: boolean = !hasImage && !hasProfileBgColor;

  return (
    <View style={styles.Container}>
      <View
        style={[
          styles.messageContainer,
          { borderTopRightRadius: isPrimaryMessage ? 0 : 16 },
        ]}
      >
        <RightAngledTriangle
          style={[styles.triangleIcon, { opacity: isPrimaryMessage ? 1 : 0 }]}
        />
        <Text style={styles.messageText}>{props.message.text}</Text>
        <Text style={styles.messageTime}>{messageTime}</Text>
      </View>
      {showProfileImage && (
        <View
          style={[
            styles.userIconContainer,
            { opacity: isPrimaryMessage ? 1 : 0 },
          ]}
        >
          <Image
            source={{ uri: user.imageUrl }}
            resizeMode="contain"
            style={styles.userIcon}
          />
        </View>
      )}
      {showProfileBgColor && (
        <View
          style={[
            styles.userIconContainer,
            { opacity: isPrimaryMessage ? 1 : 0 },
          ]}
        >
          <DefaultUserProfileBgIcon
            profileBgColor={user.profileBgColor}
            name={user.name}
          />
        </View>
      )}
      {showDefaultProfileImage && (
        <View
          style={[
            styles.profileImageContainer,
            { opacity: isPrimaryMessage ? 1 : 0 },
          ]}
        >
          <Image
            source={icons.profile}
            resizeMode="contain"
            style={styles.profileImage}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    gap: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    // backgroundColor: "pink",
  },
  userIconContainer: {
    backgroundColor: COLORS.gray4,
    width: 32,
    height: 32,
    padding: 16,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  userIcon: {
    width: 32,
    height: 32,
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
    borderTopRightRadius: 0,
    position: "relative",
  },
  triangleIcon: {
    borderBottomColor: COLORS.primary,
    position: "absolute",
    right: -12,
    top: 0,
    transform: [{ rotate: "-270deg" }],
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
