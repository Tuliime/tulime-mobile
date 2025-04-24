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

type TUseMessenger = {
  messages: TMessenger["message"][];
  roomMessageMap: TMessenger["roomMessageMap"];
  pagination: TMessenger["pagination"];
  swipedMessage: TMessenger["swipedMessage"];
  messageLoader: TMessenger["messageLoader"];
  messageLoadingError: TMessenger["messageLoadingError"];
  postingMessageMap: TMessenger["postingMessage"];
  onlineStatusMap: TMessenger["onlineStatusMap"];
  typingStatusMap: TMessenger["typingStatusMap"];
  currentRecipient: TMessenger["currentRecipient"];
  userRooms: TMessenger["userRooms"];
} & TMessenger["messengerAction"];

export const useMessengerStore = create<TUseMessenger>((set, get) => ({
  messages: [],
  roomMessageMap: new Map(),
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

  // Room message action
  updateRoomMessages: (recipientID, messages) =>
    set(
      produce((state: TUseMessenger) => {
        const existingMessages = state.roomMessageMap.get(recipientID) ?? [];
        const combinedMessages = existingMessages.concat(messages);

        // Step 1: Deduplicate based on either id or sentAt
        const seenIds = new Set<string>();
        const seenSentAts = new Set<string>();
        const deduplicatedMessages: TMessenger["message"][] = [];

        for (const msg of combinedMessages) {
          const isDuplicateId = seenIds.has(msg.id);
          const isDuplicateSentAt = seenSentAts.has(msg.sentAt);

          if (!isDuplicateId && !isDuplicateSentAt) {
            seenIds.add(msg.id);
            seenSentAts.add(msg.sentAt);
            deduplicatedMessages.push(msg);
          }
        }

        // Step 2: Sort messages by arrivedAt or fallback to sentAt
        const sortedMessages = deduplicatedMessages.sort((a, b) => {
          const dateA = new Date(a.arrivedAt || a.sentAt).getTime();
          const dateB = new Date(b.arrivedAt || b.sentAt).getTime();
          return dateA - dateB;
        });

        state.roomMessageMap.set(recipientID, sortedMessages);
      })
    ),
  updateOneRoomMessage: (recipientID, message) =>
    set(
      produce((state: TUseMessenger) => {
        const existingMessages = state.roomMessageMap.get(recipientID);
        if (!existingMessages) return;

        state.roomMessageMap.set(
          recipientID,
          existingMessages.map((msg) => {
            return msg.sentAt === message.sentAt ? message : msg;
          })
        );
      })
    ),
  clearRoomMessages: () =>
    set(
      produce((state: TUseMessenger) => {
        state.roomMessageMap = new Map();
      })
    ),
  getRoomMessages: (recipientID) => get().roomMessageMap.get(recipientID)!,
  getAllMessengerRooms: () => {
    const rooms: TMessenger["message"][] = [];
    const keys = Array.from(get().roomMessageMap.keys());

    keys.map((k) => {
      const keyRooms = get().roomMessageMap.get(k);
      if (keyRooms) {
        rooms.push(keyRooms[keyRooms.length - 1]);
      }
    });

    return rooms.sort((a, b) => {
      const dateA = new Date(a.arrivedAt || a.sentAt).getTime();
      const dateB = new Date(b.arrivedAt || b.sentAt).getTime();
      return dateB - dateA; // Descending sort
    });
  },

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
      produce((state: TUseMessenger) => {
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
      produce((state: TUseMessenger) => {
        state.postingMessageMap.set(postingMessage.sentAt, postingMessage);
      })
    ),
  getPostingMessage: (sentAt) => get().postingMessageMap.get(sentAt)!,
  getAllPostingMessages: () => Array.from(get().postingMessageMap.values()),
  // Online status action
  updateOnlineStatus: (status) =>
    set(
      produce((state: TUseMessenger) => {
        state.onlineStatusMap.set(status.userID, status);
      })
    ),
  getAllOnlineStatuses: () => Array.from(get().onlineStatusMap.values()),
  // Typing status action
  updateTypingStatus: (status) =>
    set(
      produce((state: TUseMessenger) => {
        state.typingStatusMap.set(status.userID, status);
      })
    ),
  getAllTypingStatuses: () => Array.from(get().typingStatusMap.values()),
  getTypingStatusByUser: (userID) => get().typingStatusMap.get(userID)!,
  updateCurrentRecipient: (user) => set(() => ({ currentRecipient: user })),
  clearCurrentRecipient: () =>
    set(() => ({ currentRecipient: defaultRecipient })),
  updateUserRooms: (rooms) => set(() => ({ userRooms: rooms })),
  clearUserRooms: () => set(() => ({ userRooms: [] })),
}));
