import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { SenderMessage } from "./SenderMessage";
import { useAuthStore } from "@/store/auth";
import { RecipientMessage } from "./RecipientMessage";
import { useChatroomStore } from "@/store/chatroom";
import { ChatroomMessages } from "@/utils/organizeChatroomMessage";
import { MessageDay } from "./MessageDay";
import { AppDate } from "@/utils/appDate";
import { COLORS, SIZES } from "@/constants";
import { router } from "expo-router";
import { TMessenger } from "@/types/messenger";

export const ChatroomMessageList: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const currentUser = useAuthStore((state) => state.auth.user);
  const users = useAuthStore((state) => state.users) ?? [];
  const messages = useChatroomStore((state) => state.messages) ?? [];
  const replies = useChatroomStore((state) => state.replies) ?? [];
  const getAllPostingMessages = useChatroomStore(
    (state) => state.getAllPostingMessages
  );
  const postingMessageMap = useChatroomStore(
    (state) => state.postingMessageMap
  );
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
      .item as TMessenger["organizedMessage"];

    if (firstVisibleItem.arrivedAt === currentMessageDate) return;
    setCurrentMessageDate(() => firstVisibleItem.arrivedAt);
  }).current;

  const viewAbilityConfigCallbackPairs = useRef([
    { viewabilityConfig: viewAbilityConfig, onViewableItemsChanged },
  ]).current;

  // console.log("messages: ", messages);
  // console.log("replies: ", replies);
  // console.log("users: ", users);

  const organizedMessages = useMemo(() => {
    return new ChatroomMessages(
      messages,
      replies,
      users,
      currentUser
    ).organize();
  }, [messages, replies, users, currentUser]);

  const renderMessageItem = useCallback(
    ({ item }: { item: TMessenger["organizedMessage"] }) => (
      <View style={styles.messageWrapperContainer}>
        {item.showDay && <MessageDay message={item} />}
        {item.isCurrentUserSender ? (
          <SenderMessage message={item} />
        ) : (
          <RecipientMessage message={item} />
        )}
      </View>
    ),
    []
  );

  // Scroll to bottom on first render and when posting a message
  useEffect(() => {
    if (flatListRef.current && isAtTop) {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 20, animated: true });
      }, 100);
    }
  }, []);

  useEffect(() => {
    const scrollToBottomOnPostingMessage = () => {
      console.log("Scrolling to the bottom...");
      const now = Date.now();
      const postingMessagePending: boolean = !!getAllPostingMessages().find(
        (postingMessage) =>
          postingMessage.status === "pending" &&
          now - 3000 <= new Date(postingMessage.sentAt).getTime()
      );
      console.log("postingMessagePending: ", postingMessagePending);
      if (flatListRef.current && postingMessagePending) {
        console.log("Scrolled to the bottom...");
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    };
    scrollToBottomOnPostingMessage();
  }, [postingMessageMap]);

  const onScrollStartHandler = () => {
    setShowDateOnScroll(() => true);
  };

  const onScrollEndHandler = () => {
    setTimeout(() => setShowDateOnScroll(() => false), 2000);
  };

  const onScrollHandler = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    setIsAtTop(() => contentOffset.y === 0);

    const isFlatListTop: boolean = contentOffset.y <= 0;
    const isFlatListBottom: boolean =
      contentOffset.y + layoutMeasurement.height >= contentSize.height;

    if (isFlatListTop) {
      console.log("Reached the top");
      router.setParams({
        cursor: organizedMessages[0].id,
        includeCursor: "false",
        direction: "BACKWARD",
        urlUpdateAction: "SCROLL",
      });
    }

    if (isFlatListBottom) {
      console.log("Reached the bottom");
      if (isFlatListBottom) return;
      router.setParams({
        cursor: organizedMessages[organizedMessages.length - 1].id,
        includeCursor: "false",
        direction: "FORWARD",
        urlUpdateAction: "SCROLL",
      });
    }
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
        contentContainerStyle={{
          rowGap: 12,
          flexGrow: 1,
          paddingBottom: SIZES.medium,
        }}
        viewabilityConfigCallbackPairs={viewAbilityConfigCallbackPairs}
        onScrollBeginDrag={onScrollStartHandler}
        onScrollEndDrag={onScrollEndHandler}
        onScroll={onScrollHandler}
        scrollEventThrottle={16} // Adjust for performance
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
