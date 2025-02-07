import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { TChatroom } from "@/types/chatroom";
import { useChatroomStore } from "@/store/chatroom";

type MessageOnSwipeProps = {
  message: TChatroom["organizedMessage"];
  children: ReactNode;
};

export const MessageOnSwipe: React.FC<MessageOnSwipeProps> = (props) => {
  const updateSwipedMessage = useChatroomStore(
    (state) => state.updateSwipedMessage
  );
  const translateX = useSharedValue(0);
  const threshold = 68;

  const updateSwipedMessageHandler = () => {
    updateSwipedMessage(props.message);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value >= threshold) {
        runOnJS(updateSwipedMessageHandler)();
      }
      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyle}>{props.children}</Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });
