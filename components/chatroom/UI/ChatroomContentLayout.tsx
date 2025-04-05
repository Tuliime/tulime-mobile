import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { ChatroomLayout } from "@/components/chatroom/layout/ChatroomLayout";
import { MessageForm } from "@/components/chatroom/UI/MessageForm";
import { COLORS } from "@/constants";
import { ChatroomMessageList } from "@/components/chatroom/UI/MessageList";
import { useChatroomStore } from "@/store/chatroom";
import { isArrayWithElements } from "@/utils/isArrayWithElements";
import { useGlobalSearchParams } from "expo-router";

export const ChatroomContentLayout: React.FC = () => {
  const messageLoader = useChatroomStore((state) => state.messageLoader);
  const messageLoadingError = useChatroomStore(
    (state) => state.messageLoadingError
  );
  const messagesFromStore = useChatroomStore((state) => state.messages);
  const { direction } = useGlobalSearchParams<{
    cursor: string;
    includeCursor: string;
    direction: string;
    urlUpdateAction: string;
  }>();
  const isForwardDirection: boolean = direction === "FORWARD";

  //   const showFirstTimeMessageLoader: boolean = isPending && !hasMessages;
  //   const showPrevMessageLoader: boolean =
  //     isPending && hasMessages && !isForwardDirection;
  //   const showNextMessageLoader: boolean =
  //     isPending && hasMessages && isForwardDirection;
  //   const showMessageList: boolean = hasMessages;
  //   const showNoMessage: boolean = !isPending && !hasMessages;
  const hasMessages = isArrayWithElements(messagesFromStore);

  const showFirstTimeMessageLoader: boolean =
    messageLoader.type === "firstTimeMessageLoader" &&
    messageLoader.isLoading &&
    !hasMessages;

  const showPrevMessageLoader: boolean =
    messageLoader.type === "prevMessageLoader" &&
    messageLoader.isLoading &&
    hasMessages &&
    !isForwardDirection;

  const showNextMessageLoader: boolean =
    messageLoader.type === "nextMessageLoader" &&
    messageLoader.isLoading &&
    hasMessages &&
    isForwardDirection;

  const showMessageList: boolean = hasMessages;
  //   const showNoMessage: boolean = !isPending && !hasMessages;
  const showNoMessage: boolean = !showFirstTimeMessageLoader && !hasMessages;
  const showMessageLoadingError: boolean =
    !!messageLoadingError.message && messageLoadingError.isError;

  return (
    <ChatroomLayout title="Chatfam" chatInputField={<MessageForm />}>
      <View style={{ flex: 1, gap: 0 }}>
        {showMessageLoadingError && (
          <View style={styles.loadingErrorContainer}>
            <Text style={styles.loadingErrorText}>
              {messageLoadingError.message}
            </Text>
          </View>
        )}
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
  loadingErrorContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.red2,
    padding: 8,
  },
  loadingErrorText: {
    color: COLORS.red7,
    fontSize: 14,
    textAlign: "center",
  },
});
