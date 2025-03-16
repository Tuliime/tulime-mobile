import { useMutation } from "@tanstack/react-query";
import { auth } from "@/API/auth";
import { TAuth } from "@/types/auth";
import { useAuthStore } from "@/store/auth";

export const useSignInWithRefreshToken = () => {
  const updateAuth = useAuthStore((state) => state.updateAuth);

  const { mutateAsync } = useMutation({
    mutationFn: auth.signInWithRefreshToken,
    onSuccess: (response: TAuth["apiResponse"]) => {
      console.log("Signin with refreshToken response:", response);
      updateAuth(response);
    },
    onError: (error) => {
      console.log("RT signin Error:", error);
    },
  });

  /**
   * signInWithRT fn makes an actual API call to the backend to sign in the user
   * by refreshToken and waits for the response before proceeding.
   */
  const signInWithRT = async (
    values: TAuth["signInWithRefreshToken"]
  ): Promise<boolean> => {
    try {
      const response = await mutateAsync(values);
      return !!response;
    } catch {
      return false;
    }
  };

  return { signInWithRT };
};
