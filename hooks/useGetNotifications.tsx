import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import { notification } from "@/API/notification";
import { useNotificationStore } from "@/store/notification";
import { TNotification } from "@/types/notification";
import { isArrayWithElements } from "@/utils/isArrayWithElements";
import { isJWTTokenExpired } from "@/utils/expiredJWT";

export const useGetNotifications = () => {
  const accessToken = useAuthStore((state) => state.auth.accessToken);
  const userID = useAuthStore((state) => state.auth.user.id);
  const isExpiredAccessToken = isJWTTokenExpired(accessToken);

  const updateAllNotifications = useNotificationStore(
    (state) => state.updateAllNotifications
  );

  const updateAllNotificationCount = useNotificationStore(
    (state) => state.updateAllNotificationCount
  );

  const updateChatNotificationCount = useNotificationStore(
    (state) => state.updateChatNotificationCount
  );

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`notifications-${userID}`],
    queryFn: () => {
      if (!accessToken || isExpiredAccessToken) return {} as any;
      return notification.get({ userID: userID, token: accessToken });
    },
  });

  const notificationResponse: TNotification["notificationAPIResponse"] =
    data?.data;

  if (isError) {
    console.log("error:", error);
  }

  // console.log("notificationResponse: ", notificationResponse);

  useEffect(() => {
    const hasNotifications = isArrayWithElements(
      notificationResponse?.notifications
    );
    if (!hasNotifications) return;

    updateAllNotificationCount(notificationResponse?.allNotificationCount);
    updateChatNotificationCount(notificationResponse?.chatNotificationCount);
    updateAllNotifications(notificationResponse?.notifications);
  }, [data, isPending]);
};
