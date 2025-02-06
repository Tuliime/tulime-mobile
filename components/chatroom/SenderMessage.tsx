import React from "react";
import { COLORS } from "@/constants";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AppDate } from "@/utils/appDate";
import { TChatroom } from "@/types/chatroom";
import { RightAngledTriangle } from "../shared/icons/RightAngledTriangle";
import { ReplySenderMessage } from "./ReplySenderMessage";

const screenWidth = Dimensions.get("window").width * 0.98;
const maxWidth = screenWidth * 0.76;

type SenderMessageProps = {
  message: TChatroom["organizedMessage"];
};

export const SenderMessage: React.FC<SenderMessageProps> = (props) => {
  const messageTime = new AppDate(props.message.arrivedAt!).time();
  const isPrimaryMessage: boolean = props.message.isPrimaryMessage;
  const hasReplyMessage: boolean = !!props.message.repliedMessage?.id;

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
        {/* <ReplySenderMessage message={props.message} /> */}
        {hasReplyMessage && <ReplySenderMessage message={props.message} />}
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
    justifyContent: "flex-end",
    paddingRight: 12,
    // backgroundColor: "pink",
  },
  messageContainer: {
    width: "auto",
    maxWidth: maxWidth,
    backgroundColor: COLORS.green2,
    padding: 4,
    paddingBottom: 18,
    borderRadius: 12,
    borderTopRightRadius: 0,
    position: "relative",
  },
  triangleIcon: {
    borderBottomColor: COLORS.green2,
    position: "absolute",
    right: -12,
    top: 0,
    transform: [{ rotate: "-270deg" }],
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
