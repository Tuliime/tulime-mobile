import { Auth } from "./auth";
import { TAdvert } from "./advert";
import { Asset } from "./assets";

type MessengerTag = {
  id: string;
  messengerID: string;
  advertID: string;
  createdAt: string;
  updatedAt: string;
  advert?: TAdvert["advert"];
};

type Message = {
  id: string;
  messengerRoomID: string;
  senderID: string;
  recipientID: string;
  text: string;
  reply: string;
  repliedMessage: Message | null;
  file: TFile | null;
  localFile?: TLocalFile;
  tag: MessengerTag[] | null;
  isRead: boolean;
  sentAt: string;
  arrivedAt: string;
  createdAt: string;
  updatedAt: string;
  sender: Auth["user"] | null;
  recipient: Auth["user"] | null;
};

type ImageDimensions = {
  width: number;
  height: number;
};

export type TFile = {
  id: string;
  messengerID: string;
  url: string;
  path: string;
  dimensions: ImageDimensions;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export type Pagination = {
  limit: number;
  prevCursor: string | null;
  nextCursor: string | null;
  includeCursor: boolean;
  hasNextItems: boolean;
  hasPrevItems: boolean;
  direction: string;
};

type TLocalFile = Asset["file"];

type OrganizedMessage = Message & {
  isPrimaryMessage: boolean;
  isCurrentUserSender: boolean;
  showDay: boolean;
};

type GetMessageInput = {
  limit: number;
  cursor?: string;
  includeCursor?: boolean;
  direction?: "FORWARD" | "BACKWARD";
  messengerRoomID: string;
  userOneID: string;
  userTwoID: string;
};

type MessageInput = {
  messengerRoomID: string;
  senderID: string;
  recipientID: string;
  text: string;
  reply: string;
  file: Blob | null;
  localFile?: TLocalFile;
  sentAt: string;
  tag?: string[];
  isRead: boolean;
};

type MessageLoader = {
  type: "firstTimeMessageLoader" | "prevMessageLoader" | "nextMessageLoader";
  isLoading: boolean;
};

type MessageLoadingError = {
  message: string;
  isError: boolean;
};

type OnlineStatus = {
  id: string;
  userID: string;
  createdAt: string;
  updatedAt: string;
};

type TypingStatus = {
  userID: string;
  startedTypingAt: string;
  recipientID: string;
  user: Auth["user"];
};

type GetMessageAPIResponse = {
  data: Message[];
  pagination: Pagination;
  status: string;
};

type GetRoomsByUserInput = {
  limit: number;
  cursor?: string;
  userID: string;
};

type UpdateTypingStatusInput = {
  userID: string;
  startedTypingAt: string;
};

type PostingMessage = {
  status: "pending" | "success" | "error" | null;
  sentAt: string;
};

type SSEData = {
  type: string;
  data: any;
};

type TMessengerAction = {
  updateAllMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateMessage: (message: Message) => void;
  updateMessageBySentAt: (message: Message) => void;
  clearMessages: () => void;
  updatePagination: (pagination: Pagination) => void;
  clearPagination: () => void;
  updateSwipedMessage: (message: OrganizedMessage) => void;
  clearSwipedMessage: () => void;
  updateMessageLoader: (messageLoader: MessageLoader) => void;
  updateMessageLoadingError: (messageLoadingError: MessageLoadingError) => void;
  updatePostingMessage: (postingMessage: PostingMessage) => void;
  getPostingMessage: (sentAt: string) => PostingMessage;
  getAllPostingMessages: () => PostingMessage[];
  updateOnlineStatus: (status: OnlineStatus) => void;
  getAllOnlineStatuses: () => OnlineStatus[];
  updateTypingStatus: (status: TypingStatus) => void;
  getAllTypingStatuses: () => TypingStatus[];
  updateCurrentRecipient: (user: Auth["user"]) => void;
  clearCurrentRecipient: () => void;
  updateUserRooms: (rooms: Message[]) => void;
  clearUserRooms: () => void;
};

export type TMessenger = {
  messageInput: MessageInput;
  message: Message;
  pagination: Pagination;
  organizedMessage: OrganizedMessage;
  userRooms: Message[];
  swipedMessage: OrganizedMessage | null;
  postingMessage: Map<string, PostingMessage>;
  getMessageInput: GetMessageInput;
  getMessageAPIResponse: GetMessageAPIResponse;
  getRoomsByUserInput: GetRoomsByUserInput;
  messageLoader: MessageLoader;
  messageLoadingError: MessageLoadingError;
  onlineStatus: OnlineStatus;
  typingStatus: TypingStatus;
  onlineStatusMap: Map<string, OnlineStatus>;
  typingStatusMap: Map<string, TypingStatus>;
  updateTypingStatusInput: UpdateTypingStatusInput;
  messengerAction: TMessengerAction;
  sseData: SSEData;
  messengerTag: MessengerTag;
  currentRecipient: Auth["user"];
};
