import { jwtDecode, JwtPayload } from "jwt-decode";

export const isJWTTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded.exp) {
      return decoded.exp * 1000 < Date.now();
    }
    return true;
  } catch {
    return true;
  }
};
