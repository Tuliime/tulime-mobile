import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import { chatroom } from "@/API/chatroom";
import { TChatroom } from "@/types/chatroom";
import { useChatroomStore } from "@/store/chatroom";
import { isJWTTokenExpired } from "@/utils/expiredJWT";

export const useGetOnlineStatus = () => {
  const accessToken = useAuthStore((state) => state.auth.accessToken);
  const updateOnlineStatus = useChatroomStore(
    (state) => state.updateOnlineStatus
  );
  const isExpiredAccessToken = isJWTTokenExpired(accessToken);

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`onlineStatus`],
    queryFn: () => {
      if (!accessToken || isExpiredAccessToken) return {} as any;
      return chatroom.getOnlineStatus({ token: accessToken });
    },
  });

  const onlineStatuses: TChatroom["onlineStatus"][] = data?.data ?? [];

  if (isError) {
    console.log("error:", error);
  }

  useEffect(() => {
    const updateOnlineStatusHandler = () => {
      if (onlineStatuses.length === 0) return;

      onlineStatuses.map((status) => {
        updateOnlineStatus(status);
      });
    };
    updateOnlineStatusHandler();
  }, [data, isPending]);
};
