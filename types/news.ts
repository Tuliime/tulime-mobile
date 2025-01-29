type News = {
  id: string;
  title: string;
  description: string;
  category: string;
  source: string;
  imageUrl: string;
  imagePath: string;
  postedAt: string;
  createdAt: string;
  updatedAt: string;
};

type GetNewsInput = {
  limit: number;
  category?: string;
  cursor?: string;
};

export type TNews = {
  news: News;
  getNews: GetNewsInput;
};
