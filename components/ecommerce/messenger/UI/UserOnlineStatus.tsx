import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants";
import { useChatroomStore } from "@/store/chatroom";
import { useMessengerStore } from "@/store/messenger";
import { elapsedTime } from "@/utils/elapsedTime";
import { Auth } from "@/types/auth";

type UserOnlineStatusProps = {
  showLastSeen?: boolean;
  showOnlineWord?: boolean;
  user?: Auth["user"];
};

export const UserOnlineStatus: React.FC<UserOnlineStatusProps> = (props) => {
  const getOnlineStatusByUser = useChatroomStore(
    (state) => state.getOnlineStatusByUser
  );
  const currentRecipient = useMessengerStore((state) => state.currentRecipient);
  const [showOnlineStatus, setShowOnlineStatus] = useState<boolean>(false);
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const isUserPropDataProvided: boolean = !!props.user?.id;

  useEffect(() => {
    const updateUserOnlineStatus = () => {
      const now = Date.now();
      const userOnlineStatus = isUserPropDataProvided
        ? getOnlineStatusByUser(props.user?.id!)
        : getOnlineStatusByUser(currentRecipient.id);

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

  const hasShowLastSeenProp =
    props.showLastSeen === false || props.showLastSeen === true;

  const hasShowOnlineWordProp =
    props.showOnlineWord === false || props.showOnlineWord === true;

  const showLastSeen = hasShowLastSeenProp
    ? props.showLastSeen
    : !showOnlineStatus && !!updatedAt;

  const showOnlineStatusWord = hasShowOnlineWordProp
    ? props.showOnlineWord
    : true;

  return (
    <View>
      {showOnlineStatus && (
        <View style={styles.container}>
          <View style={styles.onlineUsersContainer}>
            <View style={styles.onlineDot}></View>
            {showOnlineStatusWord && (
              <Text style={styles.onlineText}>Online</Text>
            )}
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
