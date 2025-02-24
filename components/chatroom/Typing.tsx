import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProfileAvatar } from "../shared/UI/ProfileAvatar";
import { useAuthStore } from "@/store/auth";
import { COLORS } from "@/constants";

export const Typing: React.FC = () => {
  const users = useAuthStore((state) => state.users);
  return (
    <View style={styles.container}>
      <ProfileAvatar user={users[0]} width={20} height={20} fontSize={10} />
      <ProfileAvatar user={users[1]} width={20} height={20} fontSize={10} />
      <ProfileAvatar user={users[8]} width={20} height={20} fontSize={10} />
      <ProfileAvatar user={users[3]} width={20} height={20} fontSize={10} />
      <Text style={styles.typingText}>typing...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 2,
  },
  typingText: {
    marginLeft: 2,
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: 700,
  },
});
