type Message = {
  id: string;
  userID: string;
  message: string;
  writtenBy: string;
  postedAt?: string;
  createdAt: string;
  updatedAt: string;
};

type MessageInput = {
  userID: string;
  message: string;
  writtenBy: string;
  postedAt: string;
  token: string;
};

type GetChatbotMessages = {
  userID: string;
  limit: number;
  cursor?: string;
  token: string;
};

type TChatbotAction = {
  updateAll: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateMessage: (message: Message) => void;
  clearMessages: () => void;
};

export type TChatbot = {
  message: Message;
  messageInput: MessageInput;
  getChatbotMessages: GetChatbotMessages;
  chatbotAction: TChatbotAction;
};
