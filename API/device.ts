import { serverURL } from "@/constants/urls";

class DeviceAPI {
  post = async ({
    name,
    userID,
    deviceToken,
    tokenType,
    accessToken,
  }: {
    name: string;
    userID: string;
    deviceToken: string;
    tokenType: string;
    accessToken: string;
  }) => {
    const response = await fetch(`${serverURL}/device/`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        userID: userID,
        token: deviceToken,
        tokenType: tokenType,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  getByUser = async ({ userID, token }: { userID: string; token: string }) => {
    const response = await fetch(`${serverURL}/device/user/${userID}`, {
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

  disable = async ({
    deviceID,
    token,
  }: {
    deviceID: string;
    token: string;
  }) => {
    const response = await fetch(`${serverURL}/device/disable/${deviceID}`, {
      method: "PATCH",
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

  enable = async ({ deviceID, token }: { deviceID: string; token: string }) => {
    const response = await fetch(`${serverURL}/device/enable/${deviceID}`, {
      method: "PATCH",
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

export const device = new DeviceAPI();
