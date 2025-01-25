import { useMutation } from "@tanstack/react-query";
import { auth } from "@/API/auth";
import { TAuth } from "@/types/auth";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";

export const useSignInWithRefreshToken = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const updateAuth = useAuthStore((state) => state.updateAuth);

  const { isPending, mutate } = useMutation({
    mutationFn: auth.signInWithRefreshToken,
    onSuccess: (response: TAuth["apiResponse"]) => {
      console.log("Signin with refreshToken response:", response);
      updateAuth(response);
      setIsSuccessful(() => true);
    },
    onError: (error) => {
      console.log("RT signin Error:", error);
      setIsSuccessful(() => false);
    },
  });

  /**
  signInWithRT fn makes an actual api call to the 
  backend to sign in user by refreshToken
 */
  const signInWithRT = (values: TAuth["signInWithRefreshToken"]): boolean => {
    console.log("Signin with RT values:", values);
    mutate(values);
    return isSuccessful;
  };

  return { signInWithRT };
};
