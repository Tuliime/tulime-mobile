import React from "react";
import { View } from "react-native";
import { ChatroomContentLayout } from "@/components/chatroom/UI/ChatroomContentLayout";
import { FetchChatroomMessages } from "@/components/chatroom/UI/FetchChatroomMessages";

const Chatroom: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <FetchChatroomMessages />
      <ChatroomContentLayout />
    </View>
  );
};

export default Chatroom;
