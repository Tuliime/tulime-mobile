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
  addNotifications: (newNotification) =>
    set(
      produce((state) => {
        const alreadyHasNotification: boolean = !!state.notifications.find(
          (notification: TNotification["notification"]) =>
            notification.id === newNotification.id
        );
        if (alreadyHasNotification) return;
        state.notifications.push(newNotification);
        state.allNotificationCount = state.allNotificationCount + 1;
        if (newNotification.type === "chat") {
          state.chatNotificationCount = state.chatNotificationCount + 1;
        }
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
