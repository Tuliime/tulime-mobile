import { serverURL } from "@/constants/urls";
import { TAdvert } from "@/types/advert";

class AdvertAPI {
  post = async ({
    storeID,
    userID,
    productName,
    productDescription,
  }: TAdvert["postAdvertInput"]) => {
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

  update = async ({
    advertID,
    storeID,
    userID,
    productName,
    productDescription,
  }: TAdvert["updateAdvertInput"]) => {
    const response = await fetch(`${serverURL}/adverts/${advertID}`, {
      method: "PATCH",
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

  postImages = async ({
    advertID,
    formData,
  }: {
    advertID: string;
    formData: FormData;
  }) => {
    const response = await fetch(`${serverURL}/adverts/${advertID}/image`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  updateImage = async ({
    advertID,
    advertImageID,
    formData,
  }: {
    advertID: string;
    advertImageID: string;
    formData: FormData;
  }) => {
    const response = await fetch(
      `${serverURL}/adverts/${advertID}/image/${advertImageID}`,
      {
        method: "PATCH",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

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

  postPrice = async ({
    advertID,
    amount,
    currency,
  }: TAdvert["postAdvertPriceInput"]) => {
    const response = await fetch(`${serverURL}/adverts/${advertID}/price`, {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
        currency: currency,
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

  //
  updatePrice = async ({
    advertID,
    amount,
    currency,
  }: TAdvert["postAdvertPriceInput"]) => {
    const response = await fetch(
      `${serverURL}/adverts/${advertID}/price/${serverURL}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          amount: amount,
          currency: currency,
        }),
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

  postInventory = async ({
    advertID,
    quantity,
    unit,
  }: TAdvert["postAdvertInventoryInput"]) => {
    const response = await fetch(`${serverURL}/adverts/${advertID}/inventory`, {
      method: "POST",
      body: JSON.stringify({
        quantity: quantity,
        unit: unit,
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

  updateInventory = async ({
    advertID,
    advertInventoryID,
    quantity,
    unit,
  }: TAdvert["updateAdvertInventoryInput"]) => {
    const response = await fetch(
      `${serverURL}/adverts/${advertID}/inventory/${advertInventoryID}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          quantity: quantity,
          unit: unit,
        }),
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

  publish = async ({ advertID }: TAdvert["advertPublicityInput"]) => {
    const response = await fetch(`${serverURL}/adverts/${advertID}/publish`, {
      method: "PATCH",
      body: JSON.stringify({}),
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

  unPublish = async ({ advertID }: TAdvert["advertPublicityInput"]) => {
    const response = await fetch(`${serverURL}/adverts/${advertID}/unpublish`, {
      method: "PATCH",
      body: JSON.stringify({}),
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
