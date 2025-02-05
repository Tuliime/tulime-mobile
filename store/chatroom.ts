import { create } from "zustand";
import { TChatroom } from "@/types/chatroom";

export const useChatroomStore = create<
  {
    messages: TChatroom["message"][];
    replies: TChatroom["message"][];
  } & TChatroom["chatroomAction"]
>((set) => ({
  messages: [],
  replies: [],
  // Message Actions
  updateAllMessages: (messages) =>
    set(() => ({
      messages: messages,
    })),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  updateMessage: (message) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === message.id ? { ...msg, ...message } : msg
      ),
    })),
  clearMessages: () => set(() => ({ messages: [] })),
  // Replies Actions
  updateAllReplies: (messages) =>
    set(() => ({
      replies: messages,
    })),
  addReply: (message) =>
    set((state) => ({
      replies: [...state.messages, message],
    })),
  updateReply: (message) =>
    set((state) => ({
      replies: state.messages.map((msg) =>
        msg.id === message.id ? { ...msg, ...message } : msg
      ),
    })),
  clearReplies: () => set(() => ({ replies: [] })),
}));
