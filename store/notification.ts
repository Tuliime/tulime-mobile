import { create } from "zustand";
import { produce, enableMapSet } from "immer";
import { TNotification } from "@/types/notification";

enableMapSet(); // Enable Map & Set support for Immer

export const useNotificationStore = create<
  {
    allNotificationCount: number;
    chatNotificationCount: number;
    notifications: TNotification["notification"][];
  } & TNotification["notificationAction"]
>((set) => ({
  notifications: [],
  allNotificationCount: 0,
  chatNotificationCount: 0,
  // Notification Actions
  updateAllNotificationCount: (count) =>
    set(
      produce((state) => {
        state.allNotificationCount = count;
      })
    ),
  updateChatNotificationCount: (count) =>
    set(
      produce((state) => {
        state.chatNotificationCount = count;
      })
    ),
  updateAllNotifications: (notifications) =>
    set(
      produce((state) => {
        state.notifications = notifications;
      })
    ),
  clearAllNotification: () =>
    set(
      produce((state) => {
        state.notifications = [];
        state.allNotificationCount = 0;
        state.chatNotificationCount = 0;
      })
    ),
}));
