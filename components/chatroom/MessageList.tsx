import React, { useCallback } from "react";
import { FlatList, View } from "react-native";
import { SenderMessage } from "./SenderMessage";
import { TChatroom } from "@/types/chatroom";
import { useAuthStore } from "@/store/auth";
import { RecipientMessage } from "./RecipientMessage";
import { useChatroomStore } from "@/store/chatroom";
import { ChatroomMessages } from "@/utils/organizeChatroomMessage";

export const ChatroomMessageList: React.FC = () => {
  const currentUser = useAuthStore((state) => state.auth.user);
  const users = useAuthStore((state) => state.users) ?? [];
  const messages = useChatroomStore((state) => state.messages) ?? [];
  const replies = useChatroomStore((state) => state.replies) ?? [];

  // console.log("messages: ", messages);
  // console.log("replies: ", replies);
  // console.log("users: ", users);

  const organizedMessages = new ChatroomMessages(
    messages,
    replies,
    users,
    currentUser
  ).organize();

  console.log("organizedMessages: ", organizedMessages);

  const renderMessageItem = useCallback(
    ({ item }: { item: TChatroom["organizedMessage"] }) => {
      if (item.isCurrentUserSender) {
        return <SenderMessage message={item} />;
      }
      return <RecipientMessage message={item} />;
    },
    []
  );

  return (
    <View>
      <FlatList
        data={organizedMessages}
        // keyExtractor={(item) => item.id}
        // keyExtractor={(item) => item.id!}
        keyExtractor={(item) => item.sentAt!}
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
