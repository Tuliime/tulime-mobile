import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants";
import { useChatroomStore } from "@/store/chatroom";
import { useMessengerStore } from "@/store/messenger";
import { elapsedTime } from "@/utils/elapsedTime";

export const UserOnlineStatus: React.FC = () => {
  const getOnlineStatusByUser = useChatroomStore(
    (state) => state.getOnlineStatusByUser
  );
  const currentRecipient = useMessengerStore((state) => state.currentRecipient);
  const [showOnlineStatus, setShowOnlineStatus] = useState<boolean>(false);
  const [updatedAt, setUpdatedAt] = useState<string>("");

  useEffect(() => {
    const updateUserOnlineStatus = () => {
      const now = Date.now();
      const userOnlineStatus = getOnlineStatusByUser(currentRecipient.id);
      if (!userOnlineStatus) return;
      setUpdatedAt(() => userOnlineStatus.updatedAt);

      if (now - 30000 <= new Date(userOnlineStatus.updatedAt).getTime()) {
        setShowOnlineStatus(() => true);
        return;
      }
      setShowOnlineStatus(() => false);
    };

    updateUserOnlineStatus();
    const interval = setInterval(updateUserOnlineStatus, 5000);

    return () => clearInterval(interval);
  }, [getOnlineStatusByUser]);

  const showLastSeen = !showOnlineStatus && !!updatedAt;

  return (
    <View>
      {showOnlineStatus && (
        <View style={styles.container}>
          <View style={styles.onlineUsersContainer}>
            <View style={styles.onlineDot}></View>
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </View>
      )}
      {showLastSeen && (
        <View style={styles.container}>
          <Text style={styles.lastSeenText}>
            Last seen {elapsedTime(updatedAt, "short")}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  onlineUsersContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  onlineUsersNumber: {
    fontSize: 12,
    color: COLORS.gray6,
  },
  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    marginLeft: 4,
  },
  onlineText: {
    fontSize: 12,
    color: COLORS.gray6,
    marginLeft: 4,
  },
  lastSeenText: {
    fontSize: 12,
    color: COLORS.gray6,
  },
});
