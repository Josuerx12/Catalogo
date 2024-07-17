import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { useAuth } from "../hooks/useAuth/useAuth";
import {
  Errors,
  User,
  loginCredentials,
  registerCredentials,
} from "../interfaces/user/userInterface";
import { api } from "../config/apiConnection";

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

  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const userToken = Cookies.get("refreshToken");
  useEffect(() => {
    const loadUser = async () => {
      if (userToken) {
        api.defaults.headers.common.Authorization = `Bearer ${userToken}`;
        await getUser();
      }
      setIsLoadingUser(false);
    };
    loadUser();
  }, [userToken]);

  if (isLoadingUser) {
    return (
      <div
        style={{
          flex: 1,
          width: "100%",
          minHeight: "100dvh",
          height: "100%",
          background: "#999",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "2rem" }}>Carregando dados, aguarde...</p>
      </div>
    );
  }

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
