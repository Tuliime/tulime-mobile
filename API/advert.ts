import { serverURL } from "@/constants/urls";

class AdvertAPI {
  post = async ({
    storeID,
    userID,
    productName,
    productDescription,
  }: {
    storeID: string;
    userID: string;
    productName: string;
    productDescription: string;
  }) => {
    const response = await fetch(`${serverURL}/adverts`, {
      method: "POST",
      body: JSON.stringify({
        storeID: storeID,
        userID: userID,
        productName: productName,
        productDescription: productDescription,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  getAll = async () => {
    const response = await fetch(`${serverURL}/adverts`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  get = async ({ advertID }: { advertID: string }) => {
    const response = await fetch(`${serverURL}/adverts/${advertID}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  getAnalytics = async ({ advertID }: { advertID: string }) => {
    const response = await fetch(`${serverURL}/adverts/${advertID}/analytics`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };
}

export const advert = new AdvertAPI();
