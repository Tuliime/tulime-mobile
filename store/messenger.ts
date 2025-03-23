import { create } from "zustand";
import { produce, enableMapSet } from "immer";
import { TMessenger } from "@/types/messenger";

enableMapSet(); // Enable Map & Set support for Immer

export const useChatroomStore = create<
  {
    messages: TMessenger["message"][];
    replies: TMessenger["message"][];
    swipedMessage: TMessenger["swipedMessage"];
    messageLoader: TMessenger["messageLoader"];
    messageLoadingError: TMessenger["messageLoadingError"];
    postingMessageMap: TMessenger["postingMessage"];
    onlineStatusMap: TMessenger["onlineStatusMap"];
    typingStatusMap: TMessenger["typingStatusMap"];
  } & TMessenger["messengerAction"]
>((set, get) => ({
  messages: [],
  replies: [],
  swipedMessage: null,
  messageLoader: { type: "firstTimeMessageLoader", isLoading: false },
  messageLoadingError: { message: "", isError: false },
  postingMessageMap: new Map(),
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
  clearSwipedMessage: () =>
    set(
      produce((state) => {
        state.swipedMessage = null;
      })
    ),
  // Message Loader actions
  updateMessageLoader: (messageLoader) =>
    set(() => ({ messageLoader: messageLoader })),
  // Message Loading Error
  updateMessageLoadingError: (messageLoadingError) =>
    set(() => ({ messageLoadingError: messageLoadingError })),
  // PostingMessage action
  updatePostingMessage: (postingMessage) =>
    set(
      produce((state) => {
        state.postingMessageMap.set(postingMessage.sentAt, postingMessage);
      })
    ),
  getPostingMessage: (sentAt) => get().postingMessageMap.get(sentAt)!,
  getAllPostingMessages: () => Array.from(get().postingMessageMap.values()),
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
