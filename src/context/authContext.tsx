import { ReactNode, createContext } from "react";
import { useAuth } from "../hooks/useAuth/useAuth";
import {
  User,
  loginCredentials,
  registerCredentials,
} from "../interfaces/user/userInterface";

type context = {
  user?: User;
  loading: boolean;
  errors?: string[] | string;
  login: (credentials: loginCredentials) => Promise<void>;
  register: (credentials: registerCredentials) => Promise<void>;
  getUser: () => Promise<void>;
};

const authContext = createContext<context | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading, errors, login, register, getUser } = useAuth();
  return (
    <authContext.Provider
      value={{ user, loading, errors, login, register, getUser }}
    >
      {children}
    </authContext.Provider>
  );
};
