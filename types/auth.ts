type SignUpInput = {
  name: string;
  telNumber: string;
  password: string;
};

type SignInInput = {
  telNumber: string;
  password: string;
};

type ForgotPasswordInput = {
  telNumber: string;
};

type ResetPasswordInput = {
  password: string;
  confirmPassword: string;
  OTP: string;
};

type VerifyOTPInput = {
  otp: string;
};

export type Auth = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    role: string;
    telNumber: number;
  };
};

type AuthResponse = Auth & {
  status: string;
  message: string;
};

type TAuthAction = {
  updateAuth: (auth: Auth) => void;
  deleteAuth: () => void;
};

export type TAuth = {
  signin: SignInInput;
  signup: SignUpInput;
  apiResponse: AuthResponse;
  forgotPassword: ForgotPasswordInput;
  resetPassword: ResetPasswordInput;
  verifyOTP: VerifyOTPInput;
  authAction: TAuthAction;
};
