import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS } from "@/constants";
import { router } from "expo-router";
import { useNotificationStore } from "@/store/notification";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

// TODO: To mark notifications as read
export const NotificationCount = () => {
  const otherNotificationCount = useNotificationStore(
    (state) =>
      state.notifications.filter((notification) => {
        let isNonChatOrMessengerNotification: boolean = true;
        if (notification.type === "chat" || notification.type === "messenger") {
          isNonChatOrMessengerNotification = false;
        }
        return isNonChatOrMessengerNotification;
      }).length
  );

  const chatroomNotificationCount = useNotificationStore(
    (state) =>
      state.notifications.filter((notification) => notification.type === "chat")
        .length
  );

  const messengerNotificationCount = useNotificationStore(
    (state) =>
      state.notifications.filter(
        (notification) => notification.type === "messenger"
      ).length
  );

  const [notificationCount, setNotificationCount] = useState<number | string>(
    otherNotificationCount
  );

  const [chatroomNotification, setChatroomNotification] = useState<
    number | string
  >(chatroomNotificationCount);

  const [messengerNotification, setMessengerNotification] = useState<
    number | string
  >(messengerNotificationCount);

  useEffect(() => {
    const notificationCountStrBuilder = () => {
      const notifyCount: number = otherNotificationCount;
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
  }, [otherNotificationCount]);

  useEffect(() => {
    const chatNotificationStrBuilder = () => {
      const notifyCount: number = chatroomNotificationCount;
      if (notifyCount > 9 && notifyCount < 99) {
        setChatroomNotification(() => "9+");
        return;
      }
      if (notifyCount > 99) {
        setChatroomNotification(() => "99+");
        return;
      }
      setNotificationCount(() => notifyCount);
    };

    chatNotificationStrBuilder();
  }, [chatroomNotificationCount]);

  useEffect(() => {
    const messengerNotificationStrBuilder = () => {
      const notifyCount: number = messengerNotificationCount;
      if (notifyCount > 9 && notifyCount < 99) {
        setMessengerNotification(() => "9+");
        return;
      }
      if (notifyCount > 99) {
        setMessengerNotification(() => "99+");
        return;
      }
      setMessengerNotification(() => notifyCount);
    };

    messengerNotificationStrBuilder();
  }, [messengerNotification]);

  const navigateToNotification = () => {
    router.push("/notification");
  };

  const navigateToChatroom = () => {
    router.push("/chatroom");
  };

  const navigateToMessengerRooms = () => {
    router.push("/ecommerce/messenger");
  };

  const showAllNotificationCount: boolean = !!otherNotificationCount;
  const showChatroomNotificationCount: boolean = !!chatroomNotificationCount;
  const showMessengerNotificationCount: boolean = !!messengerNotificationCount;

  return (
    <View style={styles.container}>
      {/* Chat Notification Count */}
      <TouchableOpacity
        onPress={navigateToMessengerRooms}
        style={styles.btnContainer}
      >
        {showMessengerNotificationCount && (
          <View style={styles.notificationCountContainer}>
            <Text style={styles.notificationCountText}>
              {messengerNotificationCount + chatroomNotificationCount}
            </Text>
          </View>
        )}
        <Ionicons name="chatbox-outline" size={24} color={COLORS.white} />
      </TouchableOpacity>

      {/* Messenger Count */}
      {/* <TouchableOpacity
        onPress={navigateToChatroom}
        style={styles.btnContainer}
      >
        {showChatroomNotificationCount && (
          <View style={styles.notificationCountContainer}>
            <Text style={styles.notificationCountText}>
              {chatroomNotificationCount}
            </Text>
          </View>
        )}
        <MaterialCommunityIcons
          name="account-group-outline"
          size={24}
          color={COLORS.white}
        />
      </TouchableOpacity> */}

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
  },
  notificationCountText: {
    color: COLORS.gray1,
    fontSize: 10,
  },
});
