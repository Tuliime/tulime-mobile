import { create } from "zustand";
import { TChatroom } from "@/types/chatroom";
import { produce, enableMapSet } from "immer";

enableMapSet(); // Enable Map & Set support for Immer

export const useChatroomStore = create<
  {
    messages: TChatroom["message"][];
    replies: TChatroom["message"][];
    swipedMessage: TChatroom["swipedMessage"];
    postingMessage: TChatroom["postingMessage"];
    onlineStatusMap: TChatroom["onlineStatusMap"];
    typingStatusMap: TChatroom["typingStatusMap"];
  } & TChatroom["chatroomAction"]
>((set, get) => ({
  messages: [],
  replies: [],
  swipedMessage: null,
  postingMessage: { status: null, sentAt: "" },
  onlineStatusMap: new Map(),
  typingStatusMap: new Map(),
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
  updateMessageBySentAt: (message) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.sentAt === message.sentAt ? { ...msg, ...message } : msg
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
  // Swiped message actions
  updateSwipedMessage: (message) => set(() => ({ swipedMessage: message })),
  clearSwipedMessage: () => set(() => ({ swipedMessage: null })),
  // PostingMessage action
  updatePostingMessage: (postingMessage) =>
    set(() => ({ postingMessage: postingMessage })),
  // Online status action
  updateOnlineStatus: (status) =>
    set(
      produce((state) => {
        state.onlineStatusMap.set(status.userID, status);
      })
    ),
  getAllOnlineStatuses: () => Array.from(get().onlineStatusMap.values()),
  // Typing status action
  updateTypingStatus: (status) =>
    set(
      produce((state) => {
        state.typingStatusMap.set(status.userID, status);
      })
    ),
  getAllTypingStatuses: () => Array.from(get().typingStatusMap.values()),
}));
