import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { addCommasToNumber } from "@/utils";
import { COLORS } from "@/constants";
import { useAuthStore } from "@/store/auth";
import { useChatroomStore } from "@/store/chatroom";

export const ChatroomUsers: React.FC = () => {
  const users = useAuthStore((state) => state.users);
  const getAllOnlineStatuses = useChatroomStore(
    (state) => state.getAllOnlineStatuses
  );
  const [onlineUsers, setOnlineUsers] = useState<string[]>();

  useEffect(() => {
    const updateTypingUsers = () => {
      const now = Date.now();
      const currentlyTypingUsers = getAllOnlineStatuses()
        .filter((status) => now - 30000 <= new Date(status.updatedAt).getTime())
        .map((status) => status.userID);

      setOnlineUsers(() => currentlyTypingUsers);
    };

    updateTypingUsers();
    const interval = setInterval(updateTypingUsers, 5000);

    return () => clearInterval(interval);
  }, [getAllOnlineStatuses]);

  const currentOnlineUsers: number = onlineUsers!?.length;
  const totalUsers: number = users!?.length;
  const hasOnlineUsers: boolean = onlineUsers!?.length > 0;
  const hasUsers: boolean = users!?.length > 0;
  const showOnlineStatus: boolean = hasOnlineUsers && hasUsers;

  return (
    <View>
      {showOnlineStatus && (
        <View style={styles.container}>
          <View style={styles.onlineUsersContainer}>
            <Text style={styles.onlineUsersNumber}>
              {addCommasToNumber(currentOnlineUsers)}
            </Text>
            <View style={styles.onlineDot}></View>
            <Text style={styles.onlineUsersLabel}>Online</Text>
          </View>
          <View style={styles.seperationDot}></View>
          <View style={styles.totalUsersContainer}>
            <Text style={styles.totalUsersNumber}>
              {addCommasToNumber(totalUsers)}
            </Text>
            <Text style={styles.totalUsersLabel}>Total </Text>
          </View>
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
  onlineUsersLabel: {
    fontSize: 12,
    color: COLORS.gray6,
    marginLeft: 4,
  },
  seperationDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: COLORS.gray6,
  },
  totalUsersContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 4,
  },
  totalUsersNumber: {
    fontSize: 12,
    color: COLORS.gray6,
  },
  totalUsersLabel: {
    fontSize: 12,
    color: COLORS.gray6,
  },
});
