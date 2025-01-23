type SignUpInput = {
  name: string;
  telNumber: string;
  password: string;
};

type SignInInput = {
  telNumber: string;
  password: string;
};

type AuthResponse = {};

export type TAuth = {
  signin: SignInInput;
  signup: SignUpInput;
  apiResponse: AuthResponse;
};
