import { useEffect } from "react";
import { chatroom } from "@/API/chatroom";
import { useAuthStore } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import { useChatroomStore } from "@/store/chatroom";
import { isArrayWithElements } from "@/utils/isArrayWithElements";
import { useGlobalSearchParams } from "expo-router";
import { parseBool } from "@/utils/parseBool";
import { TMessenger } from "@/types/messenger";

export const useGetMessengerThreads = () => {
  const auth = useAuthStore((state) => state.auth);
  const updateAllMessages = useChatroomStore(
    (state) => state.updateAllMessages
  );
  const updateAllReplies = useChatroomStore((state) => state.updateAllReplies);
  const messagesFromStore = useChatroomStore((state) => state.messages) ?? [];
  const repliesFromStore = useChatroomStore((state) => state.replies) ?? [];
  const updateMessageLoader = useChatroomStore(
    (state) => state.updateMessageLoader
  );
  const updateMessageLoadingError = useChatroomStore(
    (state) => state.updateMessageLoadingError
  );

  const { cursor, includeCursor, direction, urlUpdateAction } =
    useGlobalSearchParams<{
      cursor: string;
      includeCursor: string;
      direction: string;
      urlUpdateAction: string;
    }>();

  const isForwardDirection: boolean = direction === "FORWARD";

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`chatroom-${auth.user.id}-${cursor}-${direction}`],
    queryFn: () => {
      return chatroom.get({
        limit: 20,
        cursor: !!cursor ? cursor : "",
        includeCursor: parseBool(includeCursor),
        direction: isForwardDirection ? "FORWARD" : "BACKWARD",
        token: auth.accessToken,
      });
    },
  });

  const msgAPIResponse: TMessenger["getMessageAPIResponse"] = data;
  const incomingMessages: TMessenger["message"][] =
    msgAPIResponse?.data?.messages ?? [];
  const incomingReplies: TMessenger["message"][] =
    msgAPIResponse?.data?.replies ?? [];

  //   console.log("msgAPIResponse:", msgAPIResponse);

  const hasMessages = isArrayWithElements(messagesFromStore);

  useEffect(() => {
    if (incomingMessages?.length === 0) {
      return;
    }
    const updateMessageHandler = () => {
      if (isForwardDirection) {
        if (
          messagesFromStore[messagesFromStore.length - 1]?.id ===
          incomingMessages[incomingMessages.length - 1].id
        ) {
          return;
        }
        const resultingMessages = [...messagesFromStore, ...incomingMessages];
        const resultingReplies = [...repliesFromStore, ...incomingReplies];
        updateAllMessages(resultingMessages);
        updateAllReplies(resultingReplies);
        return;
      }
      if (!isForwardDirection) {
        if (messagesFromStore[0]?.id === incomingMessages[0].id) {
          return;
        }
        const resultingMessages = [...incomingMessages, ...messagesFromStore];
        const resultingReplies = [...incomingReplies, ...repliesFromStore];
        updateAllMessages(resultingMessages);
        updateAllReplies(resultingReplies);
        return;
      }
      updateAllMessages(incomingMessages);
      updateAllReplies(incomingReplies);
    };
    updateMessageHandler();
  }, [data]);

  //   update loading status
  useEffect(() => {
    const updateMessageLoaderHandler = () => {
      const showFirstTimeMessageLoader: boolean = isPending && !hasMessages;
      const showPrevMessageLoader: boolean =
        isPending && hasMessages && !isForwardDirection;
      const showNextMessageLoader: boolean =
        isPending && hasMessages && isForwardDirection;

      if (showFirstTimeMessageLoader) {
        updateMessageLoader({
          type: "firstTimeMessageLoader",
          isLoading: isPending,
        });
      } else if (showPrevMessageLoader) {
        updateMessageLoader({
          type: "prevMessageLoader",
          isLoading: isPending,
        });
      } else if (showNextMessageLoader) {
        updateMessageLoader({
          type: "nextMessageLoader",
          isLoading: isPending,
        });
      } else {
        updateMessageLoader({
          type: "firstTimeMessageLoader",
          isLoading: false,
        });
      }
    };
    updateMessageLoaderHandler();
  }, [isPending, hasMessages, isForwardDirection]);

  //   update error status
  useEffect(() => {
    const updateLoadingErrorHandler = () => {
      updateMessageLoadingError({ message: error?.message!, isError: isError });
    };
    updateLoadingErrorHandler();
  }, [isError]);

  return {};
};
