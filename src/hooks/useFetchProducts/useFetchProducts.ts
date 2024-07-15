/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../config/apiConnection";
import { Product } from "../../interfaces/product/productInterface";

export interface IGetProductsProps {
  name?: string | null;
  limit?: string | null;
  page?: string | null;
}

type Payload = {
  products: Product[];
  totalPages: number;
  currentPage: number;
};

export const useFetchProducts = () => {
  const getProducts = async ({
    limit,
    name,
    page,
  }: IGetProductsProps): Promise<Payload> => {
    try {
      const res = await api.get("/products", {
        params: {
          limit: limit ? limit : undefined,
          name: name ? name : undefined,
          page: page ? page : undefined,
        },
      });
      const data = await res.data.payload;
      return data;
    } catch (error: any) {
      console.log(error);
      throw error.response.data;
    }
  };
  const getProduct = async (id: string): Promise<Product> => {
    try {
      const res = await api.get("/products/" + id);
      const data = await res.data.payload.product;
      return data;
    } catch (error: any) {
      console.log(error);
      throw error.response.data;
    }
  };
  return {
    getProducts,
    getProduct,
  };
};
