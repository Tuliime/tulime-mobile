import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { Linking } from "react-native";

// Set notification handling behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const useNotificationListener = () => {
  const notificationListener = useRef<any | null>(null);
  const responseListener = useRef<any | null>(null);

  useEffect(() => {
    // Listen for notifications when the app is in the foreground
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("📩 Notification received in foreground:", notification);
      });

    // Handle when the user interacts with the notification (tap, dismiss)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("✅ User interacted with notification:", response);
        const url = response.notification.request.content.data?.url;
        if (url) {
          Linking.openURL(url); // Opens the deep link when the notification is tapped
        }
      });

    return () => {
      if (notificationListener.current)
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      if (responseListener.current)
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
};
