import { serverURL } from "@/constants/urls";
import { TMessenger } from "@/types/messenger";

class MessengerAPI {
  post = async ({ formData }: { formData: FormData }) => {
    const response = await fetch(`${serverURL}/messenger`, {
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

  getMessagesByRoom = async ({
    limit,
    cursor,
    includeCursor,
    direction,
    messengerRoomID,
    userOneID,
    userTwoID,
  }: TMessenger["getMessageInput"]) => {
    const response = await fetch(
      `${serverURL}/messenger?messengerRoomID=${messengerRoomID}&userOneID=${userOneID}&userTwoID=${userTwoID}&limit=${limit}&cursor=${cursor}&includeCursor=${includeCursor}&direction=${direction}`,
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

  getRoomsByUser = async ({
    limit,
    cursor,
    userID,
  }: TMessenger["getRoomsByUserInput"]) => {
    const response = await fetch(
      `${serverURL}/messenger/rooms/user/${userID}?limit=${limit}&cursor=${cursor}`,
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

  updateTypingStatus = async ({
    userID,
    startedTypingAt,
  }: TMessenger["updateTypingStatusInput"]) => {
    const response = await fetch(`${serverURL}/chatroom/typingstatus`, {
      method: "PATCH",
      body: JSON.stringify({
        userID: userID,
        startedTypingAt: startedTypingAt,
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
}

export const messenger = new MessengerAPI();
