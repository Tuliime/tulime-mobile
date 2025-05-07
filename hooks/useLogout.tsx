import { useAuthStore } from "@/store/auth";
import { router } from "expo-router";
import { useAdvertStore } from "@/store/advert";
import { useChatbotStore } from "@/store/chatbot";
import { useChatroomStore } from "@/store/chatroom";
import { useDeviceStore } from "@/store/device";
import { useEcommerceStore } from "@/store/ecommerceStore";
import { useMessengerStore } from "@/store/messenger";
import { useNotificationStore } from "@/store/notification";

export const useLogout = () => {
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

  const logout = () => {
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

    // TODO: To include current as nextTo incase it is not home as search parameter
    // TODO: To implement navigation without history on logout

    // router.push("/auth/signin");
    router.push("/home");
  };
  return { logout };
};
