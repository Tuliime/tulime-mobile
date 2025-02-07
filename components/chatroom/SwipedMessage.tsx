import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useChatroomStore } from "@/store/chatroom";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLORS } from "@/constants";
import { truncateString } from "@/utils/truncateString";
import { useAuthStore } from "@/store/auth";

export const SwipedMessage: React.FC = () => {
  const swipedMessage = useChatroomStore((state) => state.swipedMessage);
  const clearSwipedMessage = useChatroomStore(
    (state) => state.clearSwipedMessage
  );

  const currentUser = useAuthStore((state) => state.auth.user);
  const isSenderCurrentUser = swipedMessage?.userID === currentUser.id;
  const username = isSenderCurrentUser ? "You" : swipedMessage?.user.name!;
  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={styles.closeBtn} onPress={clearSwipedMessage}>
        <AntDesign name="close" size={18} color={COLORS.gray7} />
      </TouchableOpacity>
      <View style={styles.stripeContainer}></View>
      <View style={styles.messageContainer}>
        <Text style={styles.usernameText}>{truncateString(username, 24)}</Text>
        <Text style={styles.messageText}>
          {truncateString(swipedMessage?.text!, 100)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: COLORS.gray4,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
    position: "relative",
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
  closeBtn: {
    position: "absolute",
    top: 4,
    right: 8,
  },
});
