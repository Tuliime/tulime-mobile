import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuthStore } from "@/store/auth";
import { router } from "expo-router";
import { COLORS } from "@/constants";
import { useAdvertStore } from "@/store/advert";
import { useChatbotStore } from "@/store/chatbot";
import { useChatroomStore } from "@/store/chatroom";
import { useDeviceStore } from "@/store/device";
import { useEcommerceStore } from "@/store/ecommerceStore";
import { useMessengerStore } from "@/store/messenger";
import { useNotificationStore } from "@/store/notification";

export const Logout: React.FC = () => {
  const deleteAuth = useAuthStore((state) => state.deleteAuth);
  const clearAllUsers = useAuthStore((state) => state.clearAllUsers);
  const clearAdvert = useAdvertStore((state) => state.clearAdvert);
  const clearChatbotMessages = useChatbotStore((state) => state.clearMessages);
  const clearChatroomMessages = useChatroomStore(
    (state) => state.clearMessages
  );
  const clearChatroomReplies = useChatroomStore((state) => state.clearReplies);
  const clearChatroomSwipedMessage = useChatroomStore(
    (state) => state.clearSwipedMessage
  );
  const clearAllDevices = useDeviceStore((state) => state.clearAllDevices);
  const clearStore = useEcommerceStore((state) => state.clearStore);
  const clearRoomMessages = useMessengerStore(
    (state) => state.clearRoomMessages
  );
  const clearMessengerMessages = useMessengerStore(
    (state) => state.clearMessages
  );
  const clearMessengerPagination = useMessengerStore(
    (state) => state.clearPagination
  );
  const clearMessengerSwipedMessage = useMessengerStore(
    (state) => state.clearSwipedMessage
  );
  const clearMessengerCurrentRecipient = useMessengerStore(
    (state) => state.clearCurrentRecipient
  );
  const clearAllNotification = useNotificationStore(
    (state) => state.clearAllNotification
  );

  const logoutHandler = () => {
    // maybe TODO: invalid user session
    // Auth
    deleteAuth();
    clearAllUsers();
    // Advert
    clearAdvert();
    // Chatbot
    clearChatbotMessages();
    // Chatroom
    clearChatroomMessages();
    clearChatroomReplies();
    clearChatroomSwipedMessage();
    // Device
    clearAllDevices();
    // Ecommerce store
    clearStore();
    // Messenger
    clearRoomMessages();
    clearMessengerMessages();
    clearMessengerPagination();
    clearMessengerSwipedMessage();
    clearMessengerCurrentRecipient();
    // Notification
    clearAllNotification();

    router.push("/auth/signin");
  };
  return (
    <TouchableOpacity style={styles.container} onPress={logoutHandler}>
      <MaterialCommunityIcons name="logout" size={24} color={COLORS.gray8} />
      <Text style={styles.logoutText}>Log out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 16,
    padding: 20,
  },
  logoutText: {
    color: COLORS.gray9,
    fontWeight: 500,
    fontSize: 16,
  },
});
