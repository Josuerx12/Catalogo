import { createContext, useContext } from "react";
import { useAdminUsers } from "../hooks/useAdminUsers/useAdminUser";
import { Errors, User } from "../interfaces/user/userInterface";
import { useAdminProducts } from "../hooks/useAdminProducts/useAdminProducts";
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
  addProduct: (formDataProduct: FormData) => Promise<void>;
  editProduct: (id: string, formData: FormData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  deleteImageProduct: (productID: string, photoID: string) => Promise<void>;
  productRequesting: boolean;
  productErrors: string[] | string;
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
  const {
    editProduct,
    addProduct,
    deleteProduct,
    deleteImageProduct,
    productRequesting,
    productErrors,
  } = useAdminProducts();
  return (
    <adminContext.Provider
      value={{
        users,
        loading,
        userErrors,
        userRequesting,
        editUser,
        deleteUser,
        addProduct,
        editProduct,
        createUser,
        deleteProduct,
        deleteImageProduct,
        productRequesting,
        productErrors,
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
