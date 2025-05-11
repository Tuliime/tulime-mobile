import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { chatroom } from "@/API/chatroom";
import { isJWTTokenExpired } from "@/utils/expiredJWT";

export const useUpdateOnlineStatus = () => {
  const accessToken = useAuthStore((state) => state.auth.accessToken);
  const user = useAuthStore((state) => state.auth.user);
  const isExpiredAccessToken = isJWTTokenExpired(accessToken);

  const { isPending, mutate } = useMutation({
    mutationFn: chatroom.updateOnlineStatus,
    onSuccess: (response: any) => {
      console.log("update online:", response?.status);
    },
    onError: (error) => {
      console.log("Error:", error);
    },
  });

  useEffect(() => {
    if (!accessToken || isExpiredAccessToken || !user.id) return;

    const updateStatus = () => {
      mutate({ userID: user.id, token: accessToken });
    };

    updateStatus();
    const interval = setInterval(updateStatus, 20000);

    return () => clearInterval(interval);
  }, [accessToken, user.id]);
};
