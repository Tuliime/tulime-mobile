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
import { useMessengerStore } from "@/store/messenger";
import { TMessenger } from "@/types/messenger";

export const useGetEventStream = () => {
  const effectRan = useRef(false);
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
  const retryCountRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const accessToken = useAuthStore((state) => state.auth.accessToken);
  const userID = useAuthStore((state) => state.auth.user.id);
  const addChatroomMessage = useChatroomStore((state) => state.addMessage);
  const updateOnlineStatus = useChatroomStore(
    (state) => state.updateOnlineStatus
  );
  const updateTypingStatusChatroom = useChatroomStore(
    (state) => state.updateTypingStatus
  );
  const addMessengerMessage = useMessengerStore((state) => state.addMessage);
  const updateTypingStatusMessenger = useMessengerStore(
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

  const connectToEventStream = () => {
    if (!accessToken || isExpiredAccessToken || !userID) return;

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const eventSource = new EventSourcePolyfill(`${serverURL}/event-stream`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const reconnect = (): any => {
      console.log("Auto reconnect start...");
      const retryIntervals = [1000, 5000, 10000, 15000, 20000];
      const retryCount = retryCountRef.current;
      const delay =
        retryIntervals[Math.min(retryCount, retryIntervals.length - 1)];

      retryCountRef.current += 1;

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      reconnectTimeoutRef.current = setTimeout(() => {
        console.log(`Reconnecting to SSE (attempt ${retryCount + 1})...`);
        if (delay === retryIntervals[retryIntervals.length - 1]) {
          retryCountRef.current = 0;
        }
        connectToEventStream();
      }, delay);
      console.log("Auto reconnect End...");
    };

    const onopen: EventSourcePolyfill["onopen"] = (event): any => {
      console.log("sse connection opened:", event);
      retryCountRef.current = 0;
    };

    const onerror: EventSourcePolyfill["onerror"] = (event): any => {
      console.log("sse error :", event);
      eventSource.close();

      reconnect();
    };

    const onmessage: EventSourcePolyfill["onmessage"] = async (event) => {
      const parsedData = JSON.parse(event.data) as TChatroom["sseData"];
      console.log("parsedData :", parsedData);
      const isKeepLiveMsg = parsedData.type === "keep-alive";
      const isChatroomMessage = parsedData.type === "chatroom-message";
      const isMessengerMessage = parsedData.type === "messenger";
      const isOnlineStatusMsg = parsedData.type === "online-status";
      const isTypingStatusChatroom =
        parsedData.type === "typing-status-chatroom";
      const isTypingStatusMessenger =
        parsedData.type === "typing-status-messenger";
      const isNotification = parsedData.type === "notification";

      if (isKeepLiveMsg) return;

      if (isChatroomMessage) {
        const message = parsedData.data as TChatroom["organizedMessage"];
        if (message.userID === userID) return;

        addChatroomMessage(parsedData.data);
        playNewMessageSound();
      }
      if (isMessengerMessage) {
        const message = parsedData.data as TMessenger["organizedMessage"];
        if (message.senderID === userID) return;

        addMessengerMessage(parsedData.data);
        playNewMessageSound();
      }
      if (isOnlineStatusMsg) {
        const onlineStatus = parsedData.data as TChatroom["onlineStatus"];
        updateOnlineStatus(onlineStatus);
      }

      if (isTypingStatusChatroom) {
        const typingStatus = parsedData.data as TChatroom["typingStatus"];
        updateTypingStatusChatroom(typingStatus);
      }

      if (isTypingStatusMessenger) {
        const typingStatus = parsedData.data as TMessenger["typingStatus"];
        updateTypingStatusMessenger(typingStatus);
      }

      if (isNotification) {
        const notification = parsedData.data as TNotification["notification"];
        if (notification.userID !== userID) return;
        addNotification(notification);
      }
    };

    eventSource.onmessage = onmessage;
    eventSource.onopen = onopen;
    eventSource.onerror = onerror;

    eventSourceRef.current = eventSource;
  };

  useEffect(() => {
    if (effectRan.current) return;

    connectToEventStream();

    return () => {
      effectRan.current = true;
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        console.log("sse connection closed");
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        console.log("reconnectTimeoutRef cleared");
      }
    };
  }, [accessToken]);

  return {};
};
