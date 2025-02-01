import React, { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { TChatbot } from "@/types/chatbot";
import { MessageForm } from "@/components/chatbot/MessageForm";
import { ChatbotLayout } from "@/components/shared/layout/ChatbotLayout";
import { ChatBotMessageList } from "@/components/chatbot/MessageList";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth";
import { chatbot } from "@/API/chatbot";
import { isArrayWithElements } from "@/utils/isArrayWithElements";
import { COLORS } from "@/constants";
import { ErrorCard } from "@/components/shared/UI/ErrorCard";
import { useChatbotStore } from "@/store/chatbot";

const Chatbot: React.FC = () => {
  const auth = useAuthStore((state) => state.auth);
  const updateAllMessages = useChatbotStore((state) => state.updateAll);

  // TODO: To define logic for the cursor based pagination
  const { isPending, isError, data, error } = useQuery({
    queryKey: [`chatbotMessages-${auth.user.id}`],
    queryFn: () => {
      return chatbot.get({
        userID: auth.user.id,
        limit: 20,
        cursor: "",
        token: auth.accessToken,
      });
    },
  });

  const messages: TChatbot["message"][] = data?.data ?? [];
  const hasMessages = isArrayWithElements(messages);

  useEffect(() => {
    updateAllMessages(messages);
  }, [data, isPending]);

  if (isPending) {
    return (
      <ChatbotLayout title="Tulime Chatbot" chatInputField={<MessageForm />}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue7} />
        </View>
      </ChatbotLayout>
    );
  }

  if (isError) {
    return (
      <ChatbotLayout title="Tulime Chatbot" chatInputField={<MessageForm />}>
        <View style={styles.errorContainer}>
          <ErrorCard message={error.message} />
        </View>
      </ChatbotLayout>
    );
  }

  return (
    <ChatbotLayout title="Tulime Chatbot" chatInputField={<MessageForm />}>
      <View style={{ flex: 1, gap: 24 }}>
        {hasMessages ? (
          <ChatBotMessageList />
        ) : (
          <View style={styles.noMessagesContainer}>
            <Text style={styles.noMessagesText}>
              Your Conversations will appear here
            </Text>
          </View>
        )}
      </View>
    </ChatbotLayout>
  );
};

const styles = StyleSheet.create({
  noMessagesContainer: {
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

export default Chatbot;
