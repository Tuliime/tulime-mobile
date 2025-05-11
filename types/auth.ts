type SignUpInput = {
  name: string;
  telNumber: string;
  password: string;
};

type SignInInput = {
  telNumber: string;
  password: string;
};

type SignInWithRefreshTokenInput = {
  userID: string;
  refreshToken: string;
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
    imageUrl: string;
    profileBgColor: string;
    chatroomColor: string; 
    createdAt: string;
    updatedAt: string;
  };
};

type AuthResponse = Auth & {
  status: string;
  message: string;
};

type UpdateUserInput = {
  name: string;
  telNumber: string;
  userID?: string;
  token?: string;
};

type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
  userID?: string;
  token?: string;
};

type TAuthAction = {
  updateAuth: (auth: Auth) => void;
  deleteAuth: () => void;
  updateUser: (user: Auth["user"]) => void;
  updateAllUsers: (users: Auth["user"][]) => void;
  clearAllUsers: () => void;
};

export type TAuth = {
  signin: SignInInput;
  signup: SignUpInput;
  signInWithRefreshToken: SignInWithRefreshTokenInput;
  apiResponse: AuthResponse;
  forgotPassword: ForgotPasswordInput;
  resetPassword: ResetPasswordInput;
  verifyOTP: VerifyOTPInput;
  authAction: TAuthAction;
  updateUserInput: UpdateUserInput;
  changePasswordInput: ChangePasswordInput;
};
