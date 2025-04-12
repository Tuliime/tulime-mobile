import { serverURL } from "@/constants/urls";

class StoreFeedbackAPI {
  post = async ({
    storeID,
    formData,
  }: {
    formData: FormData;
    storeID: string;
  }) => {
    const response = await fetch(`${serverURL}/store/${storeID}/feedback`, {
      method: "POST",
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

  update = async ({
    storeID,
    experience,
    title,
    description,
  }: {
    storeID: string;
    experience: string;
    title: string;
    description: string;
  }) => {
    const response = await fetch(`${serverURL}/store/${storeID}/feedback`, {
      method: "PATCH",
      body: JSON.stringify({
        experience: experience,
        title: title,
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

  getByStore = async ({ storeID }: { storeID: string }) => {
    const response = await fetch(`${serverURL}/store/${storeID}/feedback`, {
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

export const storeFeedback = new StoreFeedbackAPI();
