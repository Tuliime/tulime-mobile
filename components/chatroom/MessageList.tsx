import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { SenderMessage } from "./SenderMessage";
import { TChatroom } from "@/types/chatroom";
import { useAuthStore } from "@/store/auth";
import { RecipientMessage } from "./RecipientMessage";
import { useChatroomStore } from "@/store/chatroom";
import { ChatroomMessages } from "@/utils/organizeChatroomMessage";
import { MessageDay } from "./MessageDay";
import { AppDate } from "@/utils/appDate";
import { COLORS, SIZES } from "@/constants";

export const ChatroomMessageList: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const currentUser = useAuthStore((state) => state.auth.user);
  const users = useAuthStore((state) => state.users) ?? [];
  const messages = useChatroomStore((state) => state.messages) ?? [];
  const replies = useChatroomStore((state) => state.replies) ?? [];
  const postingMessage = useChatroomStore((state) => state.postingMessage);
  const [currentMessageDate, setCurrentMessageDate] = useState<string | null>(
    null
  );
  const [showDateOnScroll, setShowDateOnScroll] = useState<boolean>(false);

  const showCurrentMessageDate: boolean =
    !!currentMessageDate && showDateOnScroll;

  const viewAbilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length <= 0) return;

    const firstVisibleItem = viewableItems[0]
      .item as TChatroom["organizedMessage"];

    if (firstVisibleItem.arrivedAt === currentMessageDate) return;
    setCurrentMessageDate(() => firstVisibleItem.arrivedAt);
  }).current;

  const viewAbilityConfigCallbackPairs = useRef([
    { viewabilityConfig: viewAbilityConfig, onViewableItemsChanged },
  ]).current;

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
        return (
          <View style={styles.messageWrapperContainer}>
            {item.showDay && <MessageDay message={item} />}
            <SenderMessage message={item} />
          </View>
        );
      }
      return (
        <View style={styles.messageWrapperContainer}>
          {item.showDay && <MessageDay message={item} />}
          <RecipientMessage message={item} />
        </View>
      );
    },
    []
  );

  // Scroll to bottom on first render and when posting a message
  // useEffect(() => {
  //   if (flatListRef.current) {
  //     setTimeout(() => {
  //       flatListRef.current?.scrollToEnd({ animated: true });
  //     }, 100);
  //   }
  // }, [postingMessage.status]);

  const onScrollStartHandler = () => {
    setShowDateOnScroll(() => true);
  };

  const onScrollEndHandler = () => {
    setTimeout(() => setShowDateOnScroll(() => false), 2000);
  };

  return (
    <View style={styles.container}>
      {showCurrentMessageDate && (
        <View style={styles.currentMessageContainer}>
          <Text style={styles.currentMessageText}>
            {new AppDate(currentMessageDate!).day()}
          </Text>
        </View>
      )}
      <FlatList
        ref={flatListRef}
        data={organizedMessages}
        keyExtractor={(item) => item.sentAt!}
        renderItem={renderMessageItem}
        numColumns={1}
        contentContainerStyle={{
          rowGap: 12,
          flexGrow: 1,
          paddingBottom: SIZES.medium,
        }}
        // onContentSizeChange={() =>
        //   flatListRef.current?.scrollToEnd({ animated: true })
        // }
        // nestedScrollEnabled={true} // Allow FlatList to scroll if inside another ScrollView
        viewabilityConfigCallbackPairs={viewAbilityConfigCallbackPairs}
        onScrollBeginDrag={onScrollStartHandler}
        onScrollEndDrag={onScrollEndHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  currentMessageContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.gray7,
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    position: "absolute",
    top: 4,
    alignSelf: "center",
    zIndex: 100,
  },
  currentMessageText: {
    color: COLORS.gray2,
    fontWeight: 500,
    fontSize: 12,
  },
  messageWrapperContainer: {
    width: "100%",
  },
});
