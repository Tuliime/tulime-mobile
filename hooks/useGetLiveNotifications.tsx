import { useEffect, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { serverURL } from "@/constants/urls";
import { useAuthStore } from "@/store/auth";
import { TNotification } from "@/types/notification";
import { useNotificationStore } from "@/store/notification";
import { isJWTTokenExpired } from "@/utils/expiredJWT";

/**
 * @deprecated Use `useGetEventStream` instead.
 */
export const useGetLiveNotifications = () => {
  const effectRan = useRef(false);
  const accessToken = useAuthStore((state) => state.auth.accessToken);
  const userID = useAuthStore((state) => state.auth.user.id);

  const addNotification = useNotificationStore(
    (state) => state.addNotifications
  );

  const isExpiredAccessToken = isJWTTokenExpired(accessToken);

  useEffect(() => {
    if (effectRan.current == true) return;

    if (!accessToken || isExpiredAccessToken || !userID) return;
    const eventSource = new EventSourcePolyfill(
      `${serverURL}/notification/live`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // const onopen = async (_: any) => {
    //   console.log("SSE connection established with backend!");
    // };

    const onmessage = async (event: any) => {
      const parsedData = JSON.parse(event.data) as TNotification["sseData"];
      // console.log("parse Live sse data: ", parsedData);
      const isKeepLiveMsg = parsedData.type === "keep-alive";
      const isNotification = parsedData.type === "notification";
      if (isKeepLiveMsg) return;

      if (isNotification) {
        const notification = parsedData.data as TNotification["notification"];
        if (notification.userID !== userID) return;

        addNotification(notification);
      }
    };

    const onerror = async (error: any) => {
      console.log("sse error :", error);
      // TO trigger auto sign with refresh token
      if (error.status === 401) {
        eventSource.close();
      }
    };

    eventSource.onmessage = onmessage;
    eventSource.onerror = onerror;
    // eventSource.onopen = onopen;

    return () => {
      effectRan.current = true;
    };
  }, [accessToken]);

  return {};
};
