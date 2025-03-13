import { serverURL } from "@/constants/urls";

class notificationAPI {
  // TODO: to include pagination  here
  get = async ({ userID, token }: { userID: string; token: string }) => {
    const response = await fetch(`${serverURL}/notification/user/${userID}`, {
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

  updateNotificationAsRead = async ({
    notificationID,
    token,
  }: {
    notificationID: string;
    token: string;
  }) => {
    const response = await fetch(
      `${serverURL}/notification/${notificationID}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          userID: notificationID,
        }),
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
}

export const notification = new notificationAPI();
