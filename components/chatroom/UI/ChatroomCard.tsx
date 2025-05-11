import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import { truncateString } from "@/utils/truncateString";
import { router } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useAuthStore } from "@/store/auth";

export const ChatroomCard: React.FC = () => {
  const isLoggedIn = !!useAuthStore((state) => state.auth.accessToken);

  const navigateToChatroom = () => {
    if (!isLoggedIn) {
      router.push("/auth/signin?nextTo=/chatroom");
      return;
    }
    router.push("/chatroom");
  };

  return (
    <TouchableOpacity onPress={navigateToChatroom}>
      <View style={styles.container}>
        <View style={styles.profileAvatarContainer}>
          <FontAwesome6 name="user-group" size={20} color={COLORS.gray2} />
        </View>
        <View style={styles.messageContentContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>Tulime Community Chatfam</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>
              {truncateString(
                "Connect, share ideas, and grow together in the heart of Tulime!",
                40
              )}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 8,
    gap: 8,
    borderBottomWidth: 1,
    borderColor: COLORS.gray4,
    paddingBottom: 16,
    marginBottom: 8,
  },
  profileAvatarContainer: {
    position: "relative",
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: COLORS.gray6,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContentContainer: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 2,
  },
  nameText: { fontSize: 16, fontWeight: 600, color: COLORS.gray8 },
  messageTime: {
    color: COLORS.gray6,
    fontWeight: 400,
    fontSize: 14,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: 20,
  },
  message: { color: COLORS.gray6, fontWeight: 400, fontSize: 14 },
});
