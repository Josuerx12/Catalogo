interface User {
  _id: string;
  name: string;
  email: string;
  photo?: string | null;
  admin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InitialState {
  users?: User[] | User;
  loading: boolean;
  sendingReq: boolean;
  errors?: string[] | string;
}
