import { ReactNode, createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth/useAuth";
import {
  Errors,
  User,
  loginCredentials,
  registerCredentials,
} from "../interfaces/user/userInterface";

type context = {
  user?: User;
  loading: boolean;
  errors?: Errors;
  login: (credentials: loginCredentials) => Promise<void>;
  logout: () => void;
  cleanErrors: () => void;
  editUser: (formData: FormData) => Promise<void>;
  register: (credentials: registerCredentials) => Promise<void>;
  recovery: (email: string) => Promise<void>;
  getUser: () => Promise<void>;
};

const authContext = createContext<context | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    user,
    loading,
    errors,
    logout,
    editUser,
    recovery,
    login,
    register,
    cleanErrors,
    getUser,
  } = useAuth();
  return (
    <authContext.Provider
      value={{
        user,
        loading,
        errors,
        logout,
        editUser,
        recovery,
        login,
        register,
        getUser,
        cleanErrors,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const Auth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("authContext must be used within an AuthProvider.");
  }
  return context;
};
