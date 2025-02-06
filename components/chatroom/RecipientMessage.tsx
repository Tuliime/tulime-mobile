import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { COLORS, icons } from "@/constants";
import { AppDate } from "@/utils/appDate";
import { TChatroom } from "@/types/chatroom";
import { RightAngledTriangle } from "../shared/icons/RightAngledTriangle";
import { useAuthStore } from "@/store/auth";

const screenWidth = Dimensions.get("window").width * 0.98;
const maxWidth = screenWidth * 0.76;

type RecipientMessageProps = {
  message: TChatroom["organizedMessage"];
};

export const RecipientMessage: React.FC<RecipientMessageProps> = (props) => {
  const messageTime = new AppDate(props.message.arrivedAt!).time();
  const user = useAuthStore((state) => state.auth.user);

  const hasImage: boolean = !!user.imageUrl;
  const isPrimaryMessage: boolean = props.message.isPrimaryMessage;

  //   TODO: To add logic for the file display
  //   TODO: To add logic for displaying the profile image
  return (
    <View style={styles.Container}>
      <View
        style={[
          styles.profileIconContainer,
          { opacity: isPrimaryMessage ? 1 : 0 },
        ]}
      >
        <Image
          source={icons.profile}
          resizeMode="contain"
          style={styles.profileIcon}
        />
      </View>
      <View
        style={[
          styles.messageContainer,
          { borderTopLeftRadius: isPrimaryMessage ? 0 : 16 },
        ]}
      >
        <RightAngledTriangle
          style={[styles.triangleIcon, { opacity: isPrimaryMessage ? 1 : 0 }]}
        />
        <Text style={styles.messageText}>{props.message.text}</Text>
        <Text style={styles.messageTime}>{messageTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    gap: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    // backgroundColor: "pink",
  },
  profileIconContainer: {
    // backgroundColor: COLORS.gray4,
    width: 32,
    height: 32,
    // padding: -8,
    // borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  profileIcon: {
    // width: "100%",
    // height: "100%",
    marginTop: -8,
    width: 44,
    height: 40,
    objectFit: "fill",
  },
  messageContainer: {
    width: "auto",
    maxWidth: maxWidth,
    backgroundColor: COLORS.gray4,
    padding: 16,
    paddingBottom: 28,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    position: "relative",
  },
  triangleIcon: {
    borderBottomColor: COLORS.gray4,
    position: "absolute",
    left: -12,
    top: 0,
    transform: [{ rotate: "180deg" }],
  },
  messageText: {
    color: COLORS.gray8,
    fontSize: 16,
  },
  messageTime: {
    color: COLORS.gray6,
    position: "absolute",
    right: 12,
    bottom: 8,
  },
});
