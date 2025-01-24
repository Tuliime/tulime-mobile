import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useAuthStore } from "@/store/auth";

export default function Index() {
  const { auth, updateAuth, deleteAuth } = useAuthStore();
  const { accessToken, refreshToken } = auth;
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log("Decoded Token:", decoded);
      if (decoded.exp) {
        return decoded.exp * 1000 < Date.now();
      }
      return true;
    } catch {
      return true;
    }
  };

  useEffect(() => {
    if (!accessToken) {
      console.log("No accessToken found, redirecting to signin.");
      deleteAuth();
      setRedirectPath("/auth/signin");
      return;
    }

    if (isTokenExpired(accessToken)) {
      console.log("AccessToken expired.");
      if (!refreshToken || isTokenExpired(refreshToken)) {
        console.log(
          "RefreshToken expired, clearing auth and redirecting to signin."
        );
        deleteAuth();
        setRedirectPath("/auth/signin");
        return;
      }

      // If refreshToken is valid and accessToken expired
      console.log("AccessToken expired and RefreshToken not expired.");
      return;
    }

    // If accessToken is valid
    console.log("AccessToken is valid, redirecting to home.");
    setRedirectPath("/home");
  }, [accessToken, refreshToken, deleteAuth, updateAuth]);

  console.log("Invoked the index screen.");

  if (redirectPath) {
    return <Redirect href={redirectPath as any} />;
  }

  return null; // No visible UI
}
