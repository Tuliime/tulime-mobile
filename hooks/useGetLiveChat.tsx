import { useEffect, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { serverURL } from "@/constants/urls";
import { useAuthStore } from "@/store/auth";
import { useChatroomStore } from "@/store/chatroom";
import { TChatroom } from "@/types/chatroom";

export const useGetLiveChat = () => {
  const effectRan = useRef(false);
  const accessToken = useAuthStore((state) => state.auth.accessToken);
  const userID = useAuthStore((state) => state.auth.user.id);
  const addMessage = useChatroomStore((state) => state.addMessage);

  useEffect(() => {
    if (effectRan.current == true) return;

    if (!accessToken || !userID) return;
    const eventSource = new EventSourcePolyfill(`${serverURL}/chatroom/live`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // const onopen = async (_: any) => {
    //   console.log("SSE connection established with backend!");
    // };

    const onmessage = async (event: any) => {
      const parsedData = JSON.parse(event.data) as TChatroom["sseData"];
      console.log("parse Live sse data: ", parsedData);
      const isKeepLiveMsg = parsedData.type === "keep-alive";
      const isChatroomMessage = parsedData.type === "chatroom-message";
      if (isKeepLiveMsg) return;

      if (isChatroomMessage) {
        addMessage(parsedData.data);
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
