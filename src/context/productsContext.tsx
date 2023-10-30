import { createContext, ReactNode, useContext } from "react";
import { useProductsCommands } from "../hooks/useFetchProducts/useProductsCommands";
import { Errors, Product } from "../interfaces/product/productInterface";

type context = {
  getProducts: () => Promise<void>;
  products?: Product[] | Product;
  errors?: Errors;
  loading: boolean;
};

const productContext = createContext<context | null>(null);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const { getProducts, products, loading, errors } = useProductsCommands();
  return (
    <productContext.Provider value={{ getProducts, products, loading, errors }}>
      {children}
    </productContext.Provider>
  );
};

export const ProductCommands = () => {
  const context = useContext(productContext);
  if (!context) {
    throw new Error("productContext must be used within an AuthProvider.");
  }
  return context;
};
