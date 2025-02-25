import React from "react";
import { COLORS } from "@/constants";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AppDate } from "@/utils/appDate";
import { TChatroom } from "@/types/chatroom";
import { RightAngledTriangle } from "../shared/icons/RightAngledTriangle";
import { RepliedMessage } from "./RepliedMessage";
import { MessageOnSwipe } from "./MessageOnSwipe";
import Feather from "@expo/vector-icons/Feather";
import { useChatroomStore } from "@/store/chatroom";
import { ImageDisplay } from "../shared/UI/ImageDisplay";
import { TextMessage } from "./TextMessage";

const screenWidth = Dimensions.get("window").width * 0.98;
const maxWidth = screenWidth * 0.76;

type SenderMessageProps = {
  message: TChatroom["organizedMessage"];
};

export const SenderMessage: React.FC<SenderMessageProps> = (props) => {
  const messageTime = new AppDate(props.message.sentAt!).time();
  const isPrimaryMessage: boolean = props.message.isPrimaryMessage;
  const hasReplyMessage: boolean = !!props.message.repliedMessage?.id;
  const hasText: boolean = !!props.message.text;
  const postingMessage = useChatroomStore((state) => state.postingMessage);
  const hasImage: boolean = !!props.message.file?.url;
  const hasLocalFile: boolean = !!props.message.localFile?.mimeType;
  const showLocalFile: boolean = hasLocalFile && !hasImage;

  const isPending: boolean =
    props.message.sentAt === postingMessage.sentAt &&
    postingMessage.status === "pending";

  const buildLocalFileURI = (file: TChatroom["message"]["localFile"]) => {
    if (!file?.mimeType || !file?.base64) return;
    return `data:${file.mimeType};base64,${file.base64}`;
  };

  return (
    <MessageOnSwipe message={props.message}>
      <View style={styles.Container}>
        <View
          style={[
            styles.messageContainer,
            {
              borderTopRightRadius: isPrimaryMessage ? 0 : 16,
              width: hasReplyMessage ? maxWidth : "auto",
            },
          ]}
        >
          <RightAngledTriangle
            style={[styles.triangleIcon, { opacity: isPrimaryMessage ? 1 : 0 }]}
          />
          {hasReplyMessage && (
            <RepliedMessage message={props.message} displayUnder={"sender"} />
          )}
          {showLocalFile && (
            <ImageDisplay
              uri={buildLocalFileURI(props.message.localFile)!}
              style={{ marginBottom: hasText ? 0 : 8 }}
            />
          )}
          {hasImage && (
            <ImageDisplay
              uri={props.message.file!.url}
              style={{ marginBottom: hasText ? 0 : 8 }}
            />
          )}
          {hasText && (
            <View style={styles.messageTextContainer}>
              {/* <Text style={styles.messageText}>{props.message.text}</Text> */}
              <TextMessage
                text={props.message.text}
                style={styles.messageText}
                tagStyle={styles.messageTextTag}
              />
            </View>
          )}
          <View style={styles.messageTimeContainer}>
            <Text style={styles.messageTime}>{messageTime}</Text>
            {isPending ? (
              <Feather name="clock" size={16} color={COLORS.gray6} />
            ) : (
              <Feather name="check" size={16} color={COLORS.gray6} />
            )}
          </View>
        </View>
      </View>
    </MessageOnSwipe>
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
    minWidth: 96,
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
  messageTextTag: {
    color: COLORS.blue7,
  },
  messageTimeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    position: "absolute",
    right: 8,
    bottom: 4,
    fontWeight: 400,
  },
  messageTime: {
    color: COLORS.gray6,
    fontSize: 12,
  },
});
