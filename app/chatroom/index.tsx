import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { ChatroomLayout } from "@/components/shared/layout/ChatroomLayout";
import { MessageForm } from "@/components/chatroom/MessageForm";
import { chatroom } from "@/API/chatroom";
import { useAuthStore } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import { useChatroomStore } from "@/store/chatroom";
import { TChatroom } from "@/types/chatroom";
import { isArrayWithElements } from "@/utils/isArrayWithElements";
import { ErrorCard } from "@/components/shared/UI/ErrorCard";
import { COLORS } from "@/constants";
import { ChatroomMessageList } from "@/components/chatroom/MessageList";
import { useGlobalSearchParams } from "expo-router";
import { parseBool } from "@/utils/parseBool";

const Chatroom: React.FC = () => {
  const auth = useAuthStore((state) => state.auth);
  const updateAllMessages = useChatroomStore(
    (state) => state.updateAllMessages
  );
  const updateAllReplies = useChatroomStore((state) => state.updateAllReplies);
  const messagesFromStore = useChatroomStore((state) => state.messages) ?? [];
  const repliesFromStore = useChatroomStore((state) => state.replies) ?? [];

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

  const msgAPIResponse: TChatroom["getMessageAPIResponse"] = data;
  const incomingMessages: TChatroom["message"][] =
    msgAPIResponse?.data?.messages ?? [];
  const incomingReplies: TChatroom["message"][] =
    msgAPIResponse?.data?.replies ?? [];

  console.log("msgAPIResponse:", msgAPIResponse);

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
  }, [data, isPending]);

  if (isError) {
    return (
      <ChatroomLayout title="Chatfam" chatInputField={<MessageForm />}>
        <View style={styles.errorContainer}>
          <ErrorCard message={error.message} />
        </View>
      </ChatroomLayout>
    );
  }

  const showFirstTimeMessageLoader: boolean = isPending && !hasMessages;
  const showPrevMessageLoader: boolean =
    isPending && hasMessages && !isForwardDirection;
  const showNextMessageLoader: boolean =
    isPending && hasMessages && isForwardDirection;
  const showMessageList: boolean = hasMessages;
  const showNoMessage: boolean = !isPending && !hasMessages;

  return (
    <ChatroomLayout title="Chatfam" chatInputField={<MessageForm />}>
      <View style={{ flex: 1, gap: 0 }}>
        {showFirstTimeMessageLoader && (
          <View style={[styles.loadingContainer, { flex: 1 }]}>
            <ActivityIndicator size="large" color={COLORS.blue7} />
          </View>
        )}
        {showPrevMessageLoader && (
          <View style={[styles.loadingContainer, { height: 30 }]}>
            <ActivityIndicator size={28} color={COLORS.gray6} />
          </View>
        )}
        {showMessageList && <ChatroomMessageList />}
        {showNextMessageLoader && (
          <View style={[styles.loadingContainer, { height: 30 }]}>
            <ActivityIndicator size={28} color={COLORS.gray6} />
          </View>
        )}
        {showNoMessage && (
          <View style={styles.noMessagesContainer}>
            <Text style={styles.noMessagesText}>
              ChatFarm Conversations will appear here
            </Text>
          </View>
        )}
      </View>
    </ChatroomLayout>
  );
};

const styles = StyleSheet.create({
  noMessagesContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  noMessagesText: {
    color: COLORS.gray6,
    textAlign: "center",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Chatroom;
