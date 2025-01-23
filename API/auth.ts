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
}

export const auth = new AuthAPI();
