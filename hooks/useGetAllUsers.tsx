import { useEffect } from "react";
import { auth } from "@/API/auth";
import { useAuthStore } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import { Auth } from "@/types/auth";

export const useGetAllUsers = () => {
  const updateAllUsers = useAuthStore((state) => state.updateAllUsers);
  const accessToken = useAuthStore((state) => state.auth.accessToken);

  if (!accessToken) {
    return {};
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`users`],
    queryFn: () => {
      return auth.get({ token: accessToken });
    },
  });

  const users: Auth["user"][] = data?.data ?? [];

  if (isError) {
    console.log("error:", error);
  }

  useEffect(() => {
    updateAllUsers(users);
  }, [data, isPending]);

  return {};
};
