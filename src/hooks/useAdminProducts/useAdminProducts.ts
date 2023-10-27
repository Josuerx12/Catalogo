/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../utils/apiConnection";
import Cookies from "js-cookie";
import * as actionTypes from "./actionTypes";
import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { ProductCommands } from "../../context/productsContext";

export const useAdminProducts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { getProducts } = ProductCommands();
  const token = Cookies.get("refreshToken");

  const addProduct = async (formDataProduct: FormData) => {
    dispatch({ type: actionTypes.sendingReq });
    try {
      const res = await api.post("/products/new", formDataProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.payload);
      await getProducts();
      dispatch({ type: actionTypes.overReq });
    } catch (error: any) {
      console.log(error);
      dispatch({ type: actionTypes.overReq });
    }
  };
  const editProduct = async (id: string, formDataProduct: FormData) => {
    dispatch({ type: actionTypes.sendingReq });
    try {
      const res = await api.patch(`/products/${id}`, formDataProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.payload);
      await getProducts();
      dispatch({ type: actionTypes.overReq });
    } catch (error: any) {
      console.log(error);
      dispatch({ type: actionTypes.overReq });
    }
  };
  const deleteProduct = async (id: string) => {
    dispatch({ type: actionTypes.sendingReq });
    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: actionTypes.overReq });
      await getProducts();
    } catch (error: any) {
      console.log(error);
      dispatch({ type: actionTypes.overReq });
      dispatch({
        type: actionTypes.errors,
        payload: error.response.data.payload.msg,
      });
    }
  };

  return {
    addProduct,
    editProduct,
    deleteProduct,
    productErrors: state.errors,
    productRequesting: state.sendingReq,
  };
};
