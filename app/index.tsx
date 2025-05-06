import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { useAuthStore } from "@/store/auth";
import { useSignInWithRefreshToken } from "@/hooks/useSignInWithRefreshToken";
import { isJWTTokenExpired } from "@/utils/expiredJWT";
import { CONNECTION_STATUS, useNetworkStatus } from "@/hooks/useNetworkStatus";
import { NetworkStatusOverlay } from "@/components/shared/UI/NetworkStatusOverlay";

// TODO: To display the UI when running this page
export default function Index() {
  const { auth, deleteAuth } = useAuthStore();
  const { accessToken, refreshToken } = auth;
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const { signInWithRT } = useSignInWithRefreshToken();
  const connectionStatus = useNetworkStatus();

  const isExpiredAccessToken = isJWTTokenExpired(accessToken);
  const isExpiredRefreshToken = isJWTTokenExpired(refreshToken);

  useEffect(() => {
    const authCheckHandler = async () => {
      if (!accessToken) {
        console.log("No accessToken found, redirecting to signin.");
        deleteAuth();
        setRedirectPath("/auth/signin");
        return;
      }

      if (!isExpiredAccessToken) {
        console.log("AccessToken is valid, redirecting to home.");
        setRedirectPath("/home");
        return;
      }

      if (isExpiredAccessToken && !isExpiredRefreshToken) {
        const signIn = await signInWithRT({
          userID: auth.user.id,
          refreshToken: refreshToken,
        });

        if (!signIn.isSuccess) {
          console.log("Sign in with RT failed, redirecting to signin.");
          setRedirectPath("/auth/signin");
          return;
        }

        console.log(
          "Expired accessToken, successfully refreshed. Redirecting to home."
        );
        setRedirectPath("/home");
        return;
      }

      console.log(
        "Expired accessToken and refresh token, redirecting to signin."
      );
      setRedirectPath("/auth/signin");
    };

    authCheckHandler();
  }, [accessToken, refreshToken, deleteAuth]);

  console.log("Invoked the index screen.");

  if (
    connectionStatus === CONNECTION_STATUS.OFFLINE ||
    connectionStatus === CONNECTION_STATUS.CONNECTING
  ) {
    return <NetworkStatusOverlay />;
  }
  // if (
  //   connectionStatus === CONNECTION_STATUS.ONLINE ||
  //   connectionStatus === CONNECTION_STATUS.CONNECTING
  // ) {
  //   return <NetworkStatusOverlay />;
  // }

  if (redirectPath) {
    return <Redirect href={redirectPath as any} />;
  }

  return null;
}
