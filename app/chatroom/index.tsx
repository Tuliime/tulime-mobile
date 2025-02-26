import React from "react";
import { View } from "react-native";
import { ChatroomContentLayout } from "@/components/chatroom/layout/ChatroomContentLayout";
import { FetchChatroomMessages } from "@/components/chatroom/FetchChatroomMessages";

const Chatroom: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <FetchChatroomMessages />
      <ChatroomContentLayout />
    </View>
  );
};

export default Chatroom;
