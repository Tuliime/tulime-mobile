import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "@/store/auth";
import { COLORS } from "@/constants";
import { RepliedImageDisplay } from "./RepliedImageDisplay";
import { FontAwesome } from "@expo/vector-icons";
import { TextMessage } from "./TextMessage";
import { TMessenger } from "@/types/messenger";
import { truncateString } from "@/utils/truncateString";

type RepliedMessageProps = {
  message: TMessenger["organizedMessage"];
  displayUnder: "sender" | "recipient";
};

export const RepliedMessage: React.FC<RepliedMessageProps> = (props) => {
  const currentUser = useAuthStore((state) => state.auth.user);
  const users = useAuthStore((state) => state.users);
  const isDisplayUnderSender: boolean = props.displayUnder === "sender";

  const getUsername = (): string => {
    const isSenderCurrentUser =
      props.message.repliedMessage?.sender?.id === currentUser.id;

    const username = isSenderCurrentUser
      ? props.message.repliedMessage?.sender?.name!
      : props.message.repliedMessage?.recipient?.name!;

    return username;
  };

  const getChatroomColor = (): string => {
    const isSenderCurrentUser =
      props.message.repliedMessage?.sender?.id === currentUser.id;
    if (isSenderCurrentUser) return COLORS.blue4;

    return props.message.repliedMessage?.recipient?.chatroomColor!;
  };

  // TODO: To add onPress action that updates the cursor
  // in the query params to the current message id

  const hasImage: boolean = !!props.message.repliedMessage?.file?.url;
  const hasText: boolean = !!props.message.repliedMessage?.text;
  const showPhotoIcon: boolean = hasImage && !hasText;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isDisplayUnderSender ? COLORS.green1 : COLORS.gray4,
        },
      ]}
    >
      {/* TODO: To remove the stripe */}
      <View
        style={[
          styles.stripeContainer,
          { backgroundColor: getChatroomColor() },
        ]}
      ></View>
      <View style={styles.messageContainer}>
        {/* TODO: username */}
        <Text style={[styles.usernameText, { color: getChatroomColor() }]}>
          {truncateString(getUsername(), 24)}
        </Text>
        {hasText && (
          <TextMessage
            text={truncateString(props.message.repliedMessage?.text!, 100)}
            style={styles.messageText}
            tagStyle={styles.messageTextTag}
          />
        )}
        {showPhotoIcon && (
          <View style={styles.imageIconContainer}>
            <FontAwesome name="image" size={16} color={COLORS.gray7} />
            <Text style={styles.imageIconText}>Photo</Text>
          </View>
        )}
      </View>
      {hasImage && (
        <RepliedImageDisplay uri={props.message.repliedMessage?.file?.url!} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 0,
  },
  stripeContainer: {
    width: 4,
    height: "96%",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: COLORS.blue4,
    marginRight: -4,
  },
  messageContainer: {
    flex: 1,
    height: "100%",
    padding: 8,
    paddingTop: 4,
    paddingLeft: 12,
  },
  usernameText: {
    color: COLORS.blue4,
    fontSize: 14,
    fontWeight: 500,
  },
  messageText: {
    flex: 1,
    color: COLORS.gray7,
    fontSize: 14,
  },
  messageTextTag: {
    color: COLORS.blue4,
  },
  imageIconContainer: {
    height: "100%",
    flex: 1,
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-end",
  },
  imageIconText: {
    color: COLORS.gray7,
    fontSize: 14,
    marginBottom: -2,
  },
});
