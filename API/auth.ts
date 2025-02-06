import { serverURL } from "@/constants/urls";
import { TAuth } from "@/types/auth";

class AuthAPI {
  signup = async ({ name, telNumber, password }: TAuth["signup"]) => {
    const response = await fetch(`${serverURL}/user/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        telNumber: parseInt(telNumber),
        password: password,
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

  signIn = async ({ telNumber, password }: TAuth["signin"]) => {
    const response = await fetch(`${serverURL}/user/auth/signin`, {
      method: "POST",
      body: JSON.stringify({
        telNumber: parseInt(telNumber),
        password: password,
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

  signInWithRefreshToken = async ({
    userID,
    refreshToken,
  }: TAuth["signInWithRefreshToken"]) => {
    const response = await fetch(`${serverURL}/user/auth/rt-signin`, {
      method: "POST",
      body: JSON.stringify({
        userID: userID,
        refreshToken: refreshToken,
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

  forgotPassword = async ({ telNumber }: TAuth["forgotPassword"]) => {
    const response = await fetch(`${serverURL}/user/auth/forgot-password`, {
      method: "POST",
      body: JSON.stringify({
        telNumber: parseInt(telNumber),
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

  verifyOTP = async ({ otp }: TAuth["verifyOTP"]) => {
    const response = await fetch(`${serverURL}/user/auth/verify-otp`, {
      method: "PATCH",
      body: JSON.stringify({
        otp: otp,
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

  resetPassword = async ({ OTP, password }: TAuth["resetPassword"]) => {
    const response = await fetch(
      `${serverURL}/user/auth/reset-password/${OTP}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          password: password,
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

  updateUser = async ({
    userID,
    token,
    name,
    telNumber,
  }: TAuth["updateUserInput"]) => {
    const response = await fetch(`${serverURL}/user/${userID}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        telNumber: parseInt(telNumber),
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

  changePassword = async ({
    userID,
    token,
    currentPassword,
    newPassword,
  }: TAuth["changePasswordInput"]) => {
    const response = await fetch(
      `${serverURL}/user/${userID}/auth/change-password`,
      {
        method: "PATCH",
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
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

  get = async ({ token }: { token: string }) => {
    const response = await fetch(`${serverURL}/user`, {
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

export const auth = new AuthAPI();
