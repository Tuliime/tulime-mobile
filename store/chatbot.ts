import { create } from "zustand";
import { TChatbot } from "@/types/chatbot";

export const useChatbotStore = create<
  { messages: TChatbot["message"][] } & TChatbot["chatbotAction"]
>((set) => ({
  messages: [],
  updateAll: (messages) =>
    set((state) => ({
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
