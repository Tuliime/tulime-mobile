import { serverURL } from "@/constants/urls";
import { TSearchAPI } from "@/types/search";

class SearchAPI {
  create = async ({ query }: TSearchAPI) => {
    const response = await fetch(`${serverURL}/search?query=${query}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.log("error: ", error);
      throw new Error(error.message);
    }
    return await response.json();
  };
}

export const search = new SearchAPI();
