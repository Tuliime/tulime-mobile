type Pagination = {
  limit: number;
  prevCursor: string;
};

type TFile = {
  id: string;
  feedbackID: string;
  url: string;
  path: string;
  createdAt: string;
  updatedAt: string;
};

type TLocalFile = {
  base64: string;
  mimeType: string;
};

type Feedback = {
  id: string;
  title: string;
  description: string;
  files: TFile[];
  createdAt: string;
  updatedAt: string;
};

type FeedbackInput = {
  title: string;
  description: string;
  files: TFile[];
};

export type TFeedback = {
  feedback: Feedback;
  feedbackInput: FeedbackInput;
};
