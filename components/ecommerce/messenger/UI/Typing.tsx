import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants";
import { useMessengerStore } from "@/store/messenger";
import { SyncLoader } from "@/components/shared/loaders/SyncLoader";

export const Typing: React.FC = () => {
  const getTypingStatusByUser = useMessengerStore(
    (state) => state.getTypingStatusByUser
  );
  const currentRecipient = useMessengerStore((state) => state.currentRecipient);
  const [showTypingStatus, setShowTypingStatus] = useState<boolean>(false);

  useEffect(() => {
    const updateTypingUsers = () => {
      const now = Date.now();
      const userTypingStatus = getTypingStatusByUser(currentRecipient.id);
      if (!userTypingStatus) return;

      if (now - 3000 <= new Date(userTypingStatus.startedTypingAt).getTime()) {
        setShowTypingStatus(() => true);
        return;
      }
      setShowTypingStatus(() => false);
    };

    updateTypingUsers();
    const interval = setInterval(updateTypingUsers, 1000);

    return () => clearInterval(interval);
  }, [getTypingStatusByUser]);

  console.log("showTypingStatus: ", showTypingStatus);
  return (
    <View>
      {showTypingStatus && (
        <View style={styles.container}>
          <Text style={styles.typingText}>Typing</Text>
          <SyncLoader color={COLORS.primary} size={4.5} speed={480} />
        </View>
      )}
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
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: 700,
  },
});
