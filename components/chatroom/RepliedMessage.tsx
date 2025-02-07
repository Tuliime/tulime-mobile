import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TChatroom } from "@/types/chatroom";
import { useAuthStore } from "@/store/auth";
import { COLORS } from "@/constants";
import { truncateString } from "@/utils";

type RepliedMessageProps = {
  message: TChatroom["organizedMessage"];
  isNeutralColors?: boolean;
};

export const RepliedMessage: React.FC<RepliedMessageProps> = (props) => {
  const currentUser = useAuthStore((state) => state.auth.user);
  const isSenderCurrentUser = props.message.userID === currentUser.id;
  const username = isSenderCurrentUser ? "You" : props.message.user.name;
  const isNeutralColors = props.isNeutralColors;

  // TODO: To add onPress action that updates the cursor
  // in the query params to the current message id

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isSenderCurrentUser
            ? isNeutralColors
              ? COLORS.gray4
              : COLORS.green1
            : COLORS.gray4,
        },
      ]}
    >
      <View style={styles.stripeContainer}></View>
      <View style={styles.messageContainer}>
        <Text style={styles.usernameText}>{truncateString(username, 24)}</Text>
        <Text style={styles.messageText}>
          {truncateString(props.message.repliedMessage?.text, 100)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    // backgroundColor: COLORS.green1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
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
    color: COLORS.gray7,
    fontSize: 14,
  },
});
