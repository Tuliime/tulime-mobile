import SignIn from "@/app/auth/signin";
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
}

export const auth = new AuthAPI();
