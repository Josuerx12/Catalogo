import { createContext, useContext } from "react";
import { useAdminUsers } from "../hooks/useAdminUsers/useAdminUser";
import { Errors, User } from "../interfaces/user/userInterface";
import { AdminCreateUserCredentials } from "../hooks/useAdminUsers/useAdminUser";
type Context = {
  users?: User[] | User;
  loading: boolean;
  userRequesting: boolean;
  userErrors?: Errors;
  editUser: (id: string, credentials: FormData) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createUser: (data: AdminCreateUserCredentials) => Promise<any>;
  deleteUser: (id: string) => Promise<void>;
};

const adminContext = createContext<null | Context>(null);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    users,
    loading,
    userErrors,
    userRequesting,
    createUser,
    editUser,
    deleteUser,
  } = useAdminUsers();

  return (
    <adminContext.Provider
      value={{
        users,
        loading,
        userErrors,
        userRequesting,
        editUser,
        deleteUser,

        createUser,
      }}
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
