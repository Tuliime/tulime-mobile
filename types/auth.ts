type SignUpInput = {
  name: string;
  telNumber: string;
  password: string;
};

type SignInInput = {
  name: string;
  password: string;
};

type AuthResponse = {};

export type TAuth = {
  signin: SignInInput;
  signup: SignUpInput;
  apiResponse: AuthResponse;
};
