import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuthStore } from "@/store/auth";
import { COLORS } from "@/constants";
import { Auth } from "@/types/auth";
import { useMessengerStore } from "@/store/messenger";

// TODO: To taylor this Typing to the current messenger recipient
export const Typing: React.FC = () => {
  const users = useAuthStore((state) => state.users);
  const getAllTypingStatuses = useMessengerStore(
    (state) => state.getAllTypingStatuses
  );
  const [typingUsers, setTypingUsers] = useState<Auth["user"][]>();

  useEffect(() => {
    const updateTypingUsers = () => {
      const now = Date.now();
      const currentlyTypingUsers = getAllTypingStatuses()
        .filter(
          (status) => now - 3000 <= new Date(status.startedTypingAt).getTime()
        )
        .map((status) => {
          return users.find((usr) => usr.id === status.userID)!;
        });

      setTypingUsers(() => currentlyTypingUsers);
    };

    updateTypingUsers();
    const interval = setInterval(updateTypingUsers, 1000);

    return () => clearInterval(interval);
  }, [getAllTypingStatuses]);

  const hasTypingUser: boolean = typingUsers!?.length > 0;

  return (
    <View style={styles.container}>
      {hasTypingUser && <Text style={styles.typingText}>typing...</Text>}
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
