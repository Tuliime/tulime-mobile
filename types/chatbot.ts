type Message = {
  id: string;
  userID: string;
  message: string;
  writtenBy: string;
  createdAt: string;
  updatedAt: string;
};

export type TChatbot = {
  message: Message;
};
