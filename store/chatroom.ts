import { create } from "zustand";
import { TChatroom } from "@/types/chatroom";

export const useChatroomStore = create<
  { messages: TChatroom["message"][] } & TChatroom["chatroomAction"]
>((set) => ({
  messages: [],
  updateAll: (messages) =>
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
}));
