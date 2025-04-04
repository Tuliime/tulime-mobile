import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProfileAvatar } from "../shared/UI/ProfileAvatar";
import { COLORS } from "@/constants";
import { useChatroomStore } from "@/store/chatroom";
import { Auth } from "@/types/auth";
import { addCommasToNumber } from "@/utils";
import { SyncLoader } from "../shared/loaders/SyncLoader";

export const Typing: React.FC = () => {
  const getAllTypingStatuses = useChatroomStore(
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
        .map((status) => status.user);

      setTypingUsers(() => currentlyTypingUsers);
    };

    updateTypingUsers();
    const interval = setInterval(updateTypingUsers, 1000);

    return () => clearInterval(interval);
  }, [getAllTypingStatuses]);

  const moreTypingUsers: number = typingUsers!?.length - 3;
  const hasMoreTypingUsers: boolean = typingUsers!?.length > 3;
  const hasTypingUser: boolean = typingUsers!?.length > 0;

  return (
    <View style={styles.container}>
      {typingUsers?.slice(0, 3).map((user, index) => (
        <ProfileAvatar
          key={index}
          user={user}
          width={20}
          height={20}
          fontSize={10}
        />
      ))}
      {hasMoreTypingUsers && (
        <View style={styles.moreTypingUsersCountContainer}>
          <Text style={styles.moreTypingUsersCount}>
            +{addCommasToNumber(moreTypingUsers)}
          </Text>
        </View>
      )}
      {hasTypingUser && (
        <View style={styles.typingContainer}>
          <Text style={styles.typingText}>Typing</Text>
          <SyncLoader color={COLORS.primary} size={3} speed={480} />
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
  typingContainer: {
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
  moreTypingUsersCountContainer: {
    width: 24,
    height: 24,
    backgroundColor: COLORS.gray7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  },
  moreTypingUsersCount: {
    color: COLORS.gray1,
    fontSize: 10,
    fontWeight: 700,
  },
});
