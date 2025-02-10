import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useChatroomStore } from "@/store/chatroom";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLORS } from "@/constants";
import { truncateString } from "@/utils/truncateString";
import { useAuthStore } from "@/store/auth";
import { SwipedImageDisplay } from "./SwipedImageDisplay";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const SwipedMessage: React.FC = () => {
  const swipedMessage = useChatroomStore((state) => state.swipedMessage);
  const clearSwipedMessage = useChatroomStore(
    (state) => state.clearSwipedMessage
  );

  const currentUser = useAuthStore((state) => state.auth.user);
  const isSenderCurrentUser = swipedMessage?.userID === currentUser.id;
  const username = isSenderCurrentUser ? "You" : swipedMessage?.user.name!;
  const hasImage: boolean = !!swipedMessage?.file?.url;
  const hasText: boolean = !!swipedMessage?.text;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={(_) => {
          clearSwipedMessage(), console.log("clicked clear swiped message");
        }}
      >
        <AntDesign name="close" size={18} color={COLORS.gray7} />
      </TouchableOpacity>
      <View style={styles.stripeContainer}></View>
      <View style={styles.messageContainer}>
        <Text style={styles.usernameText}>{truncateString(username, 24)}</Text>
        <View style={styles.messageContentContainer}>
          {hasText ? (
            <Text style={styles.messageText}>
              {truncateString(swipedMessage?.text!, 100)}
            </Text>
          ) : (
            <View style={styles.imageIconContainer}>
              <FontAwesome name="image" size={16} color={COLORS.gray7} />
              <Text style={styles.imageIconText}>Photo</Text>
            </View>
          )}
          {hasImage && <SwipedImageDisplay uri={swipedMessage?.file?.url!} />}
        </View>
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
    width: "100%",
    padding: 8,
    paddingTop: 4,
    paddingLeft: 12,
  },
  usernameText: {
    color: COLORS.blue4,
    fontSize: 14,
    fontWeight: 500,
  },
  messageContentContainer: {
    height: "auto",
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  messageText: {
    flex: 1,
    color: COLORS.gray7,
    fontSize: 14,
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
  closeBtn: {
    zIndex: 100,
    position: "absolute",
    top: 4,
    right: 8,
  },
});
