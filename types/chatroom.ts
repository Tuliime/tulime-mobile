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

type Mention = {
  id: string;
  chatroomID: string;
  userID: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

type Message = {
  id: string;
  userID: string;
  text: string;
  reply: string;
  file?: TFile;
  mention: Mention[];
  sentAt: string;
  arrivedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

type GetMessageInput = {
  limit: number;
  cursor?: string;
  includeCursor?: boolean;
  token: string;
};

type MessageInput = {
  userID: string;
  text: string;
  reply: string;
  file: Blob | null;
  sentAt: string;
  mention?: string[];
};

type GetMessageAPIResponse = {
  data: {
    messages: Message[];
    replies: Message[] | null;
  };
  pagination: Pagination;
  status: string;
};

type TChatroomAction = {
  updateAllMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateMessage: (message: Message) => void;
  clearMessages: () => void;
  updateAllReplies: (messages: Message[]) => void;
  addReply: (message: Message) => void;
  updateReply: (message: Message) => void;
  clearReplies: () => void;
};

export type TChatroom = {
  messageInput: MessageInput;
  message: Message;
  getMessageInput: GetMessageInput;
  getMessageAPIResponse: GetMessageAPIResponse;
  chatroomAction: TChatroomAction;
};
