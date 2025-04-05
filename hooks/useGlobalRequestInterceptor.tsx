import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { View } from "react-native";
import { useSignInWithRefreshToken } from "./useSignInWithRefreshToken";
import { router } from "expo-router";
import * as Device from "expo-device";
import { serverURL } from "@/constants/urls";

export const UseGlobalRequestInterceptor = () => {
  const { auth, deleteAuth } = useAuthStore();
  const { refreshToken, accessToken } = auth;
  const { signInWithRT } = useSignInWithRefreshToken();

  useEffect(() => {
    const fetchInterceptorHandler = () => {
      const originalFetch = global.fetch;

      global.fetch = async (...args) => {
        console.log("args url: ", args[0].toString());
        // Don't process the request if doesn't contain server url
        if (!args[0].toString().startsWith(serverURL)) {
          return await originalFetch(...args);
        }

        // Attach Authorization header if  missing
        const headers: any = args[1]?.headers;
        if (!headers.Authorization) {
          headers.Authorization = `Bearer ${accessToken}`;
        }

        // Attach X-Device header
        let deviceName: string = Device.deviceName! || "Unknown Device";
        headers["X-Device"] = `${deviceName}`;

        args[1]!["headers"] = headers;

        let response = await originalFetch(...args);

        console.log(`API Call: ${args[0]} | Status Code: ${response.status}`);

        if (response.status === 403) {
          // Auto signin user with RT
          const signIn = await signInWithRT({
            userID: auth.user.id,
            refreshToken: refreshToken,
          });

          // Retry the request
          if (signIn.isSuccess) {
            const headers: any = args[1]?.headers;
            headers.Authorization = `Bearer ${signIn.response?.accessToken}`;
            args[1]!["headers"] = headers;

            response = await originalFetch(...args);
            console.log(
              `API Call: ${args[0]} | Status Code: ${response.status}`
            );
          }

          if (!signIn.isSuccess) {
            console.log("Auto sign in with RT failed, redirecting to signin.");
            deleteAuth();
            router.push("/auth/signin");

            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        }

        return response;
      };
    };
    fetchInterceptorHandler();
  }, [refreshToken, accessToken]);

  return <View></View>;
};
