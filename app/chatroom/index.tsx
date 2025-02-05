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

const Chatroom: React.FC = () => {
  const auth = useAuthStore((state) => state.auth);
  const [includeCursor, setInCludeCursor] = useState(false);
  const updateAllMessages = useChatroomStore(
    (state) => state.updateAllMessages
  );

  const updateAllReplies = useChatroomStore((state) => state.updateAllReplies);

  // TODO: To define logic for the cursor based pagination
  const { isPending, isError, data, error } = useQuery({
    queryKey: [`chatroom-${auth.user.id}`],
    queryFn: () => {
      return chatroom.get({
        limit: 20,
        cursor: "",
        token: auth.accessToken,
        includeCursor: includeCursor,
      });
    },
  });

  // const messages: TChatroom["message"][] = data?.data ?? [];
  const msgAPIResponse: TChatroom["getMessageAPIResponse"] = data;
  const messages: TChatroom["message"][] = msgAPIResponse?.data?.messages;
  const replies: TChatroom["message"][] = msgAPIResponse?.data?.replies ?? [];

  console.log("msgAPIResponse:", msgAPIResponse);

  const hasMessages = isArrayWithElements(messages);

  // console.log("chatroom messages: ", messages);

  useEffect(() => {
    updateAllMessages(messages);
    updateAllReplies(replies);
  }, [data, isPending]);

  if (isPending) {
    return (
      <ChatroomLayout title="Tulime Chatbot" chatInputField={<MessageForm />}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue7} />
        </View>
      </ChatroomLayout>
    );
  }

  if (isError) {
    return (
      <ChatroomLayout title="Tulime Chatbot" chatInputField={<MessageForm />}>
        <View style={styles.errorContainer}>
          <ErrorCard message={error.message} />
        </View>
      </ChatroomLayout>
    );
  }

  return (
    <ChatroomLayout title="Chatroom" chatInputField={<MessageForm />}>
      <View style={{ flex: 1, gap: 24 }}>
        {hasMessages ? (
          <ChatroomMessageList />
        ) : (
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
    flex: 1,
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
