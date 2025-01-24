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

type AuthResponse = {};

export type TAuth = {
  signin: SignInInput;
  signup: SignUpInput;
  apiResponse: AuthResponse;
  forgotPassword: ForgotPasswordInput;
  resetPassword: ResetPasswordInput;
  verifyOTP: VerifyOTPInput;
};
