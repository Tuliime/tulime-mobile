import React, { useCallback } from "react";
import { FlatList, View } from "react-native";
import { SenderMessage } from "./SenderMessage";
import { TChatroom } from "@/types/chatroom";
import { useAuthStore } from "@/store/auth";
import { RecipientMessage } from "./RecipientMessage";
import { useChatroomStore } from "@/store/chatroom";

export const ChatroomMessageList: React.FC = () => {
  const user = useAuthStore((state) => state.auth.user);
  const messages = useChatroomStore((state) => state.messages);
  const replies = useChatroomStore((state) => state.replies);

  console.log("messages: ", messages);
  console.log("replies: ", replies);

  const renderMessageItem = useCallback(
    ({ item }: { item: TChatroom["message"] }) => {
      if (item.userID === user.id) {
        return (
          <SenderMessage
            id={item.id}
            userID={item.userID}
            text={item.text}
            sentAt={item.sentAt}
            arrivedAt={item.arrivedAt}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
            reply={item.reply}
            mention={item.mention}
            deletedAt={null}
          />
        );
      }
      return (
        <RecipientMessage
          id={item.id}
          userID={item.userID}
          text={item.text}
          sentAt={item.sentAt}
          arrivedAt={item.arrivedAt}
          createdAt={item.createdAt}
          updatedAt={item.updatedAt}
          reply={item.reply}
          mention={item.mention}
          deletedAt={null}
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
        keyExtractor={(item) => item.id!}
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
