import { useEffect, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { serverURL } from "@/constants/urls";
import { useAuthStore } from "@/store/auth";
import { useChatroomStore } from "@/store/chatroom";
import { TChatroom } from "@/types/chatroom";
import { Audio } from "expo-av";
import { sounds } from "@/constants";
import { isJWTTokenExpired } from "@/utils/expiredJWT";
import { TNotification } from "@/types/notification";
import { useNotificationStore } from "@/store/notification";

export const useGetEventStream = () => {
  const effectRan = useRef(false);
  const accessToken = useAuthStore((state) => state.auth.accessToken);
  const userID = useAuthStore((state) => state.auth.user.id);
  const addMessage = useChatroomStore((state) => state.addMessage);
  const updateOnlineStatus = useChatroomStore(
    (state) => state.updateOnlineStatus
  );
  const updateTypingStatus = useChatroomStore(
    (state) => state.updateTypingStatus
  );

  const addNotification = useNotificationStore(
    (state) => state.addNotifications
  );

  const isExpiredAccessToken = isJWTTokenExpired(accessToken);

  const playNewMessageSound = async () => {
    const { sound } = await Audio.Sound.createAsync(sounds.levelUpSound);
    await sound.setVolumeAsync(0.5);
    await sound.playAsync();
  };

  useEffect(() => {
    if (effectRan.current == true) return;

    if (!accessToken || isExpiredAccessToken || !userID) return;
    const eventSource = new EventSourcePolyfill(`${serverURL}/event-stream`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // const onopen = async (_: any) => {
    //   console.log("SSE connection established with backend!");
    // };

    const onmessage = async (event: any) => {
      const parsedData = JSON.parse(event.data) as TChatroom["sseData"];
      const isKeepLiveMsg = parsedData.type === "keep-alive";
      const isChatroomMessage = parsedData.type === "chatroom-message";
      const isOnlineStatusMsg = parsedData.type === "online-status";
      const isTypingStatusMsg = parsedData.type === "typing-status";
      const isNotification = parsedData.type === "notification";

      if (isKeepLiveMsg) return;

      if (isChatroomMessage) {
        const message = parsedData.data as TChatroom["organizedMessage"];
        if (message.userID === userID) return;

        addMessage(parsedData.data);
        playNewMessageSound();
      }
      if (isOnlineStatusMsg) {
        const onlineStatus = parsedData.data as TChatroom["onlineStatus"];
        updateOnlineStatus(onlineStatus);
      }
      if (isTypingStatusMsg) {
        const typingStatus = parsedData.data as TChatroom["typingStatus"];
        updateTypingStatus(typingStatus);
      }

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
