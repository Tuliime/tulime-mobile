import React, { useCallback, useEffect, useRef } from "react";
import { FlatList, View } from "react-native";
import { SenderMessage } from "./SenderMessage";
import { TChatroom } from "@/types/chatroom";
import { useAuthStore } from "@/store/auth";
import { RecipientMessage } from "./RecipientMessage";
import { useChatroomStore } from "@/store/chatroom";
import { ChatroomMessages } from "@/utils/organizeChatroomMessage";

export const ChatroomMessageList: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const currentUser = useAuthStore((state) => state.auth.user);
  const users = useAuthStore((state) => state.users) ?? [];
  const messages = useChatroomStore((state) => state.messages) ?? [];
  const replies = useChatroomStore((state) => state.replies) ?? [];
  const postingMessage = useChatroomStore((state) => state.postingMessage);

  // console.log("messages: ", messages);
  // console.log("replies: ", replies);
  // console.log("users: ", users);

  const organizedMessages = new ChatroomMessages(
    messages,
    replies,
    users,
    currentUser
  ).organize();

  const renderMessageItem = useCallback(
    ({ item }: { item: TChatroom["organizedMessage"] }) => {
      if (item.isCurrentUserSender) {
        return <SenderMessage message={item} />;
      }
      return <RecipientMessage message={item} />;
    },
    []
  );

  // Scroll to bottom on first render and when posting a message
  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [postingMessage.status]);

  return (
    <View style={{ flex: 1 }}>
      {/* Ensure the parent View takes up full height */}
      <FlatList
        ref={flatListRef}
        data={organizedMessages}
        keyExtractor={(item) => item.sentAt!}
        renderItem={renderMessageItem}
        numColumns={1}
        contentContainerStyle={{ rowGap: 12, flexGrow: 1 }} // Ensure it fills the screen
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        nestedScrollEnabled={true} // Allow FlatList to scroll if inside another ScrollView
      />
    </View>
  );
};
