import { serverURL } from "@/constants/urls";
import { TNews } from "@/types/news";

class NewsAPI {
  get = async ({ limit, category, cursor }: TNews["getNews"]) => {
    const response = await fetch(
      `${serverURL}/news?limit=${limit}&category=${category}&cursor=${cursor}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };
}

export const news = new NewsAPI();
