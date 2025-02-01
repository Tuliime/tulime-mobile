import { TChatbot } from "@/types/chatbot";
import React, { useCallback } from "react";
import { FlatList, View } from "react-native";
import { UserMessage } from "./UserMessage";
import { BotMessage } from "./BotMessage";
import { useChatbotStore } from "@/store/chatbot";

export const ChatBotMessageList: React.FC = () => {
  const messages = useChatbotStore((state) => state.messages);

  console.log("messages: ", messages);

  const renderMessageItem = useCallback(
    ({ item }: { item: TChatbot["message"] }) => {
      if (item.writtenBy === "user") {
        return (
          <UserMessage
            id={item.id}
            userID={item.userID}
            message={item.message}
            writtenBy={"user"}
            postedAt={item.postedAt}
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
          postedAt={item.postedAt}
          createdAt={item.createdAt}
          updatedAt={item.updatedAt}
        />
      );
    },
    []
  );

  return (
    <View>
      <FlatList
        data={messages}
        // keyExtractor={(item) => item.id}
        keyExtractor={(item) => item.postedAt!}
        renderItem={renderMessageItem}
        scrollEnabled={false}
        numColumns={1}
        contentContainerStyle={{
          justifyContent: "center",
          rowGap: 12,
        }}
      />
    </View>
  );
};
