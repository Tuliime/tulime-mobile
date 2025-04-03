import { Auth } from "./auth";

type Pagination = {
  limit: number;
  prevCursor: string;
};

type TFile = {
  id: string;
  chatroomID: string;
  url: string;
  path: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

type TLocalFile = {
  base64: string;
  mimeType: string;
};

type Mention = {
  id: string;
  chatroomID: string;
  userID: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user?: Auth["user"];
};

type Message = {
  id: string;
  userID: string;
  text: string;
  reply: string;
  file?: TFile;
  localFile?: TLocalFile;
  mention: Mention[];
  sentAt: string;
  arrivedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

type OrganizedMessage = Message & {
  repliedMessage: Message;
  isPrimaryMessage: boolean;
  isCurrentUserSender: boolean;
  showDay: boolean;
  user: Auth["user"];
};

type GetMessageInput = {
  limit: number;
  cursor?: string;
  includeCursor?: boolean;
  direction?: "FORWARD" | "BACKWARD";
  token: string;
};

type MessageInput = {
  values: { base64: string };
  userID: string;
  text: string;
  reply: string;
  file: Blob | null;
  localFile?: TLocalFile;
  sentAt: string;
  mention?: string[];
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
};

type GetMessageAPIResponse = {
  data: {
    messages: Message[];
    replies: Message[] | null;
  };
  pagination: Pagination;
  status: string;
};

type UpdateOnlineStatusInput = {
  userID: string;
  token: string;
};

type UpdateTypingStatusInput = {
  userID: string;
  startedTypingAt: string;
  token: string;
};

type PostingMessage = {
  status: "pending" | "success" | "error" | null;
  sentAt: string;
};

type SSEData = {
  type: string;
  data: any;
};

type TChatroomAction = {
  updateAllMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateMessage: (message: Message) => void;
  updateMessageBySentAt: (message: Message) => void;
  clearMessages: () => void;
  updateAllReplies: (messages: Message[]) => void;
  addReply: (message: Message) => void;
  updateReply: (message: Message) => void;
  clearReplies: () => void;
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
};

export type TChatroom = {
  messageInput: MessageInput;
  message: Message;
  organizedMessage: OrganizedMessage;
  swipedMessage: OrganizedMessage | null;
  postingMessage: Map<string, PostingMessage>;
  getMessageInput: GetMessageInput;
  getMessageAPIResponse: GetMessageAPIResponse;
  messageLoader: MessageLoader;
  messageLoadingError: MessageLoadingError;
  onlineStatus: OnlineStatus;
  typingStatus: TypingStatus;
  onlineStatusMap: Map<string, OnlineStatus>;
  typingStatusMap: Map<string, TypingStatus>;
  updateOnlineStatusInput: UpdateOnlineStatusInput;
  updateTypingStatusInput: UpdateTypingStatusInput;
  chatroomAction: TChatroomAction;
  sseData: SSEData;
};
