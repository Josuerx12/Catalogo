export interface User {
  _id: string;
  name: string;
  email: string;
  photo: string;
  admin: boolean;
}

export interface userPayload {
  status: string;
  message: string;
  user: User;
}

export interface loginCredentials {
  email: string;
  password: string;
}

export interface registerCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface authPayload {
  payload: {
    status: string;
    message: string;
    token: string;
  };
}

export interface Errors {
  name: Name;
  email: Email;
  password: Password;
  confirmPassword: confirmPassword;
  msg: string | string[];
}

export interface Name {
  type: string;
  msg: string;
  path: string;
  location: string;
}

export interface confirmPassword {
  type: string;
  msg: string;
  path: string;
  location: string;
}

export interface Email {
  type: string;
  msg: string;
  path: string;
  location: string;
}

export interface Password {
  type: string;
  msg: string;
  path: string;
  location: string;
}

export interface useAuthState {
  user?: User;
  token?: string;
  loading: boolean;
  errors?: Errors | string[] | string;
}
