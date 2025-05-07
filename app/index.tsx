import { useEffect, useState } from "react";
import { Redirect, useGlobalSearchParams } from "expo-router";
import { useAuthStore } from "@/store/auth";
import { useSignInWithRefreshToken } from "@/hooks/useSignInWithRefreshToken";
import { isJWTTokenExpired } from "@/utils/expiredJWT";
import { CONNECTION_STATUS, useNetworkStatus } from "@/hooks/useNetworkStatus";
import { NetworkStatusOverlay } from "@/components/shared/UI/NetworkStatusOverlay";
import { useLogout } from "@/hooks/useLogout";

// TODO: To display the UI when running this page
export default function Index() {
  const { nextTo } = useGlobalSearchParams<{ nextTo: string }>();
  const { auth, deleteAuth } = useAuthStore();
  const { accessToken, refreshToken } = auth;
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const { signInWithRT } = useSignInWithRefreshToken();
  const { logout } = useLogout();
  const connectionStatus = useNetworkStatus();

  const isExpiredAccessToken = isJWTTokenExpired(accessToken);
  const isExpiredRefreshToken = isJWTTokenExpired(refreshToken);

  useEffect(() => {
    const authCheckHandler = async () => {
      // if ((!!refreshToken && isExpiredRefreshToken) || !accessToken) {
      if (!!refreshToken && isExpiredRefreshToken) {
        logout();
        setRedirectPath("/home");
        return;
      }

      if (isExpiredAccessToken && !isExpiredRefreshToken) {
        const signIn = await signInWithRT({
          userID: auth.user.id,
          refreshToken: refreshToken,
        });

        if (!signIn.isSuccess) {
          setRedirectPath("/home");
          return;
        }

        console.log(
          "Expired accessToken, successfully refreshed. Redirecting to home or nextTo"
        );
        if (!!nextTo) {
          setRedirectPath(nextTo);
          return;
        }

        setRedirectPath("/home");
        return;
      }

      // Set redirectPath to either nextTo or /home incase
      // there is no refreshToken or when the refreshToken is expired
      // or when both accessToken and refreshToken is still valid
      if (!!nextTo) {
        setRedirectPath(nextTo);
        return;
      }

      setRedirectPath("/home");
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
