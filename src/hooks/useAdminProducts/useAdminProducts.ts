/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../config/apiConnection";

export const useAdminProducts = () => {
  const addProduct = async (formDataProduct: FormData) => {
    try {
      const res = await api.post("/products/new", formDataProduct);
      console.log(res.data.payload);
    } catch (error: any) {
      console.log(error);
      throw error.response.data;
    }
  };
  const editProduct = async ({
    formDataProduct,
    id,
  }: {
    id: string;
    formDataProduct: FormData;
  }) => {
    try {
      const res = await api.patch(`/products/${id}`, formDataProduct);
      console.log(res.data.payload);
    } catch (error: any) {
      console.log(error);
      throw error.response.data;
    }
  };
  const deleteProduct = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
    } catch (error: any) {
      console.log(error);
      throw error.response.data;
    }
  };
  const deleteImageProduct = async ({
    photoID,
    productID,
  }: {
    productID: string;
    photoID: string;
  }) => {
    try {
      await api.delete(`/products/${productID}/${photoID}`);
    } catch (error: any) {
      console.log(error);
      throw error.response.data;
    }
  };

  return {
    addProduct,
    editProduct,
    deleteProduct,
    deleteImageProduct,
  };
};
