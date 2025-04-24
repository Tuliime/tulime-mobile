import { useEffect } from "react";
import { messenger } from "@/API/messenger";
import { useAuthStore } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import { isArrayWithElements } from "@/utils/isArrayWithElements";
import { useGlobalSearchParams } from "expo-router";
import { parseBool } from "@/utils/parseBool";
import { TMessenger } from "@/types/messenger";
import { useMessengerStore } from "@/store/messenger";

export const useGetMessengerMessages = () => {
  const auth = useAuthStore((state) => state.auth);
  const updatePagination = useMessengerStore((state) => state.updatePagination);
  const updateMessageLoader = useMessengerStore(
    (state) => state.updateMessageLoader
  );
  const updateMessageLoadingError = useMessengerStore(
    (state) => state.updateMessageLoadingError
  );

  const recipient = useMessengerStore((state) => state.currentRecipient);
  const sender = auth.user;
  const messengerRoomID = useMessengerStore(
    (state) => state.getRoomMessages(recipient.id)[0]?.messengerRoomID ?? ""
  );
  const messagesFromStore =
    useMessengerStore((state) => state.getRoomMessages(recipient.id)) ?? [];

  const updateRoomMessages = useMessengerStore(
    (state) => state.updateRoomMessages
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
    queryKey: [`messengerRoom-${recipient.id}-${cursor}-${direction}`],
    queryFn: () => {
      return messenger.getMessagesByRoom({
        limit: 20,
        cursor: !!cursor ? cursor : "",
        includeCursor: parseBool(includeCursor),
        direction: isForwardDirection ? "FORWARD" : "BACKWARD",
        userOneID: sender.id,
        userTwoID: recipient.id,
        messengerRoomID: messengerRoomID,
      });
    },
  });

  const msgAPIResponse: TMessenger["getMessageAPIResponse"] = data;
  const incomingMessages: TMessenger["message"][] = msgAPIResponse?.data ?? [];
  const pagination: TMessenger["pagination"] = msgAPIResponse?.pagination;

  const hasMessages = isArrayWithElements(messagesFromStore);

  useEffect(() => {
    if (incomingMessages?.length === 0) {
      return;
    }

    const updateRoomMessageMapHandler = () => {
      updateRoomMessages(recipient.id, incomingMessages);
    };

    const updatePaginationHandler = () => {
      updatePagination(pagination);
    };

    updateRoomMessageMapHandler();
    updatePaginationHandler();
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
