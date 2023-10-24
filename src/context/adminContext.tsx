import { createContext, useContext } from "react";
import { useAdmin } from "../hooks/useAdmin/useAdmin";
import { User } from "../interfaces/user/userInterface";

type Context = {
  users?: User[] | User;
  loading: boolean;
  errors: string[] | string;
};

const adminContext = createContext<null | Context>(null);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const { users, loading, errors } = useAdmin();
  return (
    <adminContext.Provider value={{ users, loading, errors }}>
      {children}
    </adminContext.Provider>
  );
};

export const Admin = () => {
  const context = useContext(adminContext);
  if (!context) {
    throw new Error("adminContext must be used within an AuthProvider.");
  }
  return context;
};
