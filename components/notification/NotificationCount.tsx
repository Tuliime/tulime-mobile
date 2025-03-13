import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS } from "@/constants";
import { router } from "expo-router";
import { useNotificationStore } from "@/store/notification";
import Feather from "@expo/vector-icons/Feather";

export const NotificationCount = () => {
  const allNotificationCount = useNotificationStore(
    (state) => state.allNotificationCount
  );

  const chatNotificationCount = useNotificationStore(
    (state) => state.chatNotificationCount
  );

  const [notificationCount, setNotificationCount] = useState<number | string>(
    allNotificationCount - chatNotificationCount
  );

  useEffect(() => {
    const notificationCountStrBuilder = () => {
      const notifyCount: number = allNotificationCount - chatNotificationCount;
      if (notifyCount > 9 && notifyCount < 99) {
        setNotificationCount(() => "9+");
        return;
      }
      if (notifyCount > 99) {
        setNotificationCount(() => "99+");
        return;
      }
      setNotificationCount(() => notifyCount);
    };

    notificationCountStrBuilder();
  }, [allNotificationCount]);

  const navigateToNotification = () => {
    router.push("/notification");
  };

  const navigateToChatroom = () => {
    router.push("/chatroom");
  };

  const showAllNotificationCount: boolean = !!allNotificationCount;
  const showChatNotificationCount: boolean = !!chatNotificationCount;

  return (
    <View style={styles.container}>
      {/* Chat Notification Count */}
      <TouchableOpacity
        onPress={navigateToChatroom}
        style={styles.btnContainer}
      >
        {showChatNotificationCount && (
          <View style={styles.notificationCountContainer}>
            <Text style={styles.notificationCountText}>
              {chatNotificationCount}
            </Text>
          </View>
        )}
        <Feather name="message-circle" size={22} color={COLORS.white} />
      </TouchableOpacity>

      {/* All Notification Count */}
      <TouchableOpacity
        onPress={navigateToNotification}
        style={styles.btnContainer}
      >
        {showAllNotificationCount && (
          <View style={styles.notificationCountContainer}>
            <Text style={styles.notificationCountText}>
              {notificationCount}
            </Text>
            {/* <Text style={styles.notificationCountText}>99+</Text> */}
          </View>
        )}
        <MaterialIcons
          name="notifications-none"
          size={24}
          color={COLORS.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    // backgroundColor: "blue",
    width: 40,
  },
  notificationCountContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.red7,
    borderRadius: 999,
    position: "absolute",
    top: -10,
    right: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    zIndex: 10,
    minWidth: 28,
  },
  notificationCountText: {
    color: COLORS.gray1,
    fontSize: 12,
  },
});
