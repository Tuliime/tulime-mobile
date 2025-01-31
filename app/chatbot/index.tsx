import React, { useCallback } from "react";
import { View, FlatList } from "react-native";
import { MainLayout } from "@/components/shared/layout";
import ChatJson from "@/data/chatbot.json";
import { BotMessage } from "@/components/chatbot/BotMessage";
import { UserMessage } from "@/components/chatbot/UserMessage";
import { TChatbot } from "@/types/chatbot";

const Chatbot: React.FC = () => {
  const chats = ChatJson.chats;

  const renderMessageItem = useCallback(
    ({ item }: { item: TChatbot["message"] }) => {
      if (item.writtenBy === "user") {
        return (
          <UserMessage
            id={item.id}
            userID={item.userID}
            message={item.message}
            writtenBy={"user"}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
          />
        );
      }
      return (
        <BotMessage
          id={item.id}
          userID={item.userID}
          message={item.message}
          writtenBy={"bot"}
          createdAt={item.createdAt}
          updatedAt={item.updatedAt}
        />
      );
    },
    []
  );
  return (
    <MainLayout title="Tulime Chatbot">
      <View style={{ gap: 24 }}>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          scrollEnabled={false}
          numColumns={1}
          contentContainerStyle={{
            justifyContent: "center",
            rowGap: 12,
          }}
        />
      </View>
    </MainLayout>
  );
};

export default Chatbot;
