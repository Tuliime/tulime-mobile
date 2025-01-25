import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { useAuthStore } from "@/store/auth";
import { useSignInWithRefreshToken } from "@/hooks/useSignInWithRefreshToken";
import { isJWTTokenExpired } from "@/utils/expiredJWT";

export default function Index() {
  const { auth, updateAuth, deleteAuth } = useAuthStore();
  const { accessToken, refreshToken } = auth;
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const { signInWithRT } = useSignInWithRefreshToken();

  const isExpiredAccessToken = isJWTTokenExpired(accessToken);
  const isExpiredRefreshToken = isJWTTokenExpired(refreshToken);

  // TODO: to introduce 3 hour check
  useEffect(() => {
    if (!accessToken) {
      console.log("No accessToken found, redirecting to signin.");
      deleteAuth();
      setRedirectPath("/auth/signin");
      return;
    }
    if (!isExpiredAccessToken) {
      setRedirectPath(() => "/home");
      console.log("AccessToken is valid, redirecting to home.");
      return;
    }

    if (isExpiredAccessToken) {
      if (!isExpiredRefreshToken) {
        const successfulSignin = signInWithRT({
          userID: auth.user.id,
          refreshToken: refreshToken,
        });
        if (!successfulSignin) {
          console.log("Sign in with RT failed, redirecting to signin.");
          setRedirectPath(() => "/auth/signin");
          return;
        }
        console.log("Expired accessToken, redirecting to signin.");
        setRedirectPath(() => "/home");
        return;
      }

      console.log("Expired accessToken and refresh, redirecting to signin.");
      setRedirectPath(() => "/auth/signin");
      return;
    }
  }, [accessToken, refreshToken, deleteAuth, updateAuth]);

  console.log("Invoked the index screen.");

  if (redirectPath) {
    return <Redirect href={redirectPath as any} />;
  }

  return null;
}
