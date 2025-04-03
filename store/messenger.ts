import { create } from "zustand";
import { produce, enableMapSet } from "immer";
import { TMessenger } from "@/types/messenger";

const defaultPagination: TMessenger["pagination"] = {
  limit: 0,
  prevCursor: null,
  nextCursor: null,
  includeCursor: false,
  hasNextItems: false,
  hasPrevItems: false,
  direction: "",
};

const defaultRecipient: TMessenger["currentRecipient"] = {
  id: "",
  name: "",
  role: "",
  telNumber: 0,
  imageUrl: "",
  createdAt: "",
  updatedAt: "",
  profileBgColor: "",
  chatroomColor: "",
};

enableMapSet(); // Enable Map & Set support for Immer

export const useMessengerStore = create<
  {
    messages: TMessenger["message"][];
    pagination: TMessenger["pagination"];
    swipedMessage: TMessenger["swipedMessage"];
    messageLoader: TMessenger["messageLoader"];
    messageLoadingError: TMessenger["messageLoadingError"];
    postingMessageMap: TMessenger["postingMessage"];
    onlineStatusMap: TMessenger["onlineStatusMap"];
    typingStatusMap: TMessenger["typingStatusMap"];
    currentRecipient: TMessenger["currentRecipient"];
    userRooms: TMessenger["userRooms"];
  } & TMessenger["messengerAction"]
>((set, get) => ({
  messages: [],
  pagination: defaultPagination,
  swipedMessage: null,
  messageLoader: { type: "firstTimeMessageLoader", isLoading: false },
  messageLoadingError: { message: "", isError: false },
  postingMessageMap: new Map(),
  onlineStatusMap: new Map(),
  typingStatusMap: new Map(),
  currentRecipient: defaultRecipient,
  userRooms: [],
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
  // Pagination actions
  updatePagination: (pagination) => set(() => ({ pagination: pagination })),
  clearPagination: () => set(() => ({ pagination: defaultPagination })),
  updateMessageBySentAt: (message) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.sentAt === message.sentAt ? { ...msg, ...message } : msg
      ),
    })),
  clearMessages: () => set(() => ({ messages: [] })),
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
  updateCurrentRecipient: (user) => set(() => ({ currentRecipient: user })),
  clearCurrentRecipient: () =>
    set(() => ({ currentRecipient: defaultRecipient })),
  updateUserRooms: (rooms) => set(() => ({ userRooms: rooms })),
  clearUserRooms: () => set(() => ({ userRooms: [] })),
}));
