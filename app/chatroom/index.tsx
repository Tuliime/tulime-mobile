import React from "react";
import { View, Text } from "react-native";
import { ChatroomLayout } from "@/components/shared/layout/ChatroomLayout";
import { MessageForm } from "@/components/chatroom/MessageForm";

const Chatroom: React.FC = () => {
  return (
    <ChatroomLayout title="Chatroom" chatInputField={<MessageForm />}>
      <View>
        <Text>Chatroom here</Text>
      </View>
    </ChatroomLayout>
  );
};

export default Chatroom;
