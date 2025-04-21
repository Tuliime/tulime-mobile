import { serverURL } from "@/constants/urls";
import { TEcommerceStore } from "@/types/ecommerceStore";

class StoreAPI {
  post = async ({
    userID,
    name,
    description,
  }: {
    userID: string;
    name: string;
    description: string;
  }) => {
    const response = await fetch(`${serverURL}/store`, {
      method: "POST",
      body: JSON.stringify({
        userID: userID,
        name: name,
        description: description,
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
    id,
    userID,
    name,
    description,
    website,
    email,
    location,
  }: TEcommerceStore["updateStoreInput"]) => {
    const response = await fetch(`${serverURL}/store/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        userID: userID,
        name: name,
        description: description,
        website: website,
        email: email,
        location: location,
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

  updateBgImage = async ({
    storeID,
    formData,
  }: {
    formData: FormData;
    storeID: string;
  }) => {
    const response = await fetch(`${serverURL}/store/${storeID}/bg-image`, {
      method: "PATCH",
      body: formData,
      headers: {
        "Content-type": "multipart/form-data",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  updateLogo = async ({
    storeID,
    formData,
  }: {
    formData: FormData;
    storeID: string;
  }) => {
    const response = await fetch(`${serverURL}/store/${storeID}/logo`, {
      method: "PATCH",
      body: formData,
      headers: {
        "Content-type": "multipart/form-data",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  getAll = async () => {
    const response = await fetch(`${serverURL}/store`, {
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

  get = async ({ storeID }: { storeID: string }) => {
    const response = await fetch(
      `${serverURL}/store/${storeID}?includeAdverts=true`,
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

  getByUser = async ({ userID }: { userID: string }) => {
    const response = await fetch(`${serverURL}/store/user/${userID}`, {
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

export const store = new StoreAPI();
