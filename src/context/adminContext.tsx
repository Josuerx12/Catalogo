import { createContext, useContext } from "react";
import { useAdmin } from "../hooks/useAdmin/useAdmin";
import { User } from "../interfaces/user/userInterface";

type Context = {
  users?: User[] | User;
  loading: boolean;
  errors: string[] | string;
  editUser: (id: string, credentials: FormData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
};

const adminContext = createContext<null | Context>(null);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const { users, loading, errors, editUser, deleteUser } = useAdmin();
  return (
    <adminContext.Provider
      value={{ users, loading, errors, editUser, deleteUser }}
    >
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
