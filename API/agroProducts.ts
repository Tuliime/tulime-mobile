import { serverURL } from "@/constants/urls";
import { TAuth } from "@/types/auth";
import { TAgroproducts } from "@/types/product";

class AgroProductAPI {
  get = async ({
    limit,
    category,
    cursor,
  }: TAgroproducts["getAgroProduct"]) => {
    // Reconstruct the url here
    const response = await fetch(
      `${serverURL}/agroproducts?limit=${limit}&category=${category}&cursor=${cursor}`,
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

export const agroProduct = new AgroProductAPI();
