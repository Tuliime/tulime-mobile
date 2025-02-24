import { serverURL } from "@/constants/urls";
import { TChatroom } from "@/types/chatroom";

class ChatroomAPI {
  post = async ({ formData, token }: { formData: FormData; token: string }) => {
    const response = await fetch(`${serverURL}/chatroom`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-type": "multipart/form-data",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  get = async ({
    limit,
    cursor,
    includeCursor,
    token,
  }: TChatroom["getMessageInput"]) => {
    const response = await fetch(
      `${serverURL}/chatroom?limit=${limit}&cursor=${cursor}&includeCursor=${includeCursor}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  updateOnlineStatus = async ({
    userID,
    token,
  }: TChatroom["updateOnlineStatusInput"]) => {
    const response = await fetch(`${serverURL}/chatroom/onlinestatus`, {
      method: "PATCH",
      body: JSON.stringify({
        userID: userID,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  getOnlineStatus = async ({ token }: { token: string }) => {
    const response = await fetch(`${serverURL}/chatroom/onlinestatus`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };
}

export const chatroom = new ChatroomAPI();
