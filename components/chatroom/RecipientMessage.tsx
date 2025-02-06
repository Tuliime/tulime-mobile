import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { COLORS, icons } from "@/constants";
import { AppDate } from "@/utils/appDate";
import { TChatroom } from "@/types/chatroom";
import { RightAngledTriangle } from "../shared/icons/RightAngledTriangle";
import { useAuthStore } from "@/store/auth";
import { ReplyRecipientMessage } from "./ReplyRecipientMessage";

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
  const hasReplyMessage: boolean = !!props.message.repliedMessage?.id;

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
        {/* <ReplyRecipientMessage message={props.message} /> */}
        {hasReplyMessage && <ReplyRecipientMessage message={props.message} />}
        <View style={styles.messageTextContainer}>
          <Text style={styles.messageText}>{props.message.text}</Text>
        </View>
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
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  profileIcon: {
    marginTop: -8,
    width: 44,
    height: 40,
    objectFit: "fill",
  },
  messageContainer: {
    width: "auto",
    maxWidth: maxWidth,
    backgroundColor: COLORS.gray3,
    padding: 4,
    paddingBottom: 18,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    position: "relative",
  },
  triangleIcon: {
    borderBottomColor: COLORS.gray3,
    position: "absolute",
    left: -12,
    top: 0,
    transform: [{ rotate: "180deg" }],
  },
  messageTextContainer: {
    padding: 4,
    paddingLeft: 8,
  },
  messageText: {
    color: COLORS.gray9,
    fontSize: 16,
  },
  messageTime: {
    color: COLORS.gray6,
    position: "absolute",
    right: 8,
    bottom: 4,
    fontWeight: 400,
    fontSize: 12,
  },
});
