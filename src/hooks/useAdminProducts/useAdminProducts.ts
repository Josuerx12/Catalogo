/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../config/apiConnection";
import * as actionTypes from "./actionTypes";
import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { useFetchProducts } from "../useFetchProducts/useFetchProducts";

export const useAdminProducts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { getProducts } = useFetchProducts();

  const addProduct = async (formDataProduct: FormData) => {
    dispatch({ type: actionTypes.sendingReq });
    try {
      const res = await api.post("/products/new", formDataProduct);
      console.log(res.data.payload);
      await getProducts({});
      dispatch({ type: actionTypes.overReq });
    } catch (error: any) {
      console.log(error);
      dispatch({ type: actionTypes.overReq });
    }
  };
  const editProduct = async (id: string, formDataProduct: FormData) => {
    dispatch({ type: actionTypes.sendingReq });
    try {
      const res = await api.patch(`/products/${id}`, formDataProduct);
      console.log(res.data.payload);
      await getProducts({});
      dispatch({ type: actionTypes.overReq });
    } catch (error: any) {
      console.log(error);
      dispatch({ type: actionTypes.overReq });
    }
  };
  const deleteProduct = async (id: string) => {
    dispatch({ type: actionTypes.sendingReq });
    try {
      await api.delete(`/products/${id}`);
      dispatch({ type: actionTypes.overReq });
      await getProducts({});
    } catch (error: any) {
      console.log(error);
      dispatch({ type: actionTypes.overReq });
      dispatch({
        type: actionTypes.errors,
        payload: error.response.data.payload.msg,
      });
    }
  };
  const deleteImageProduct = async (productID: string, photoID: string) => {
    dispatch({ type: actionTypes.sendingReq });
    try {
      await api.delete(`/products/${productID}/${photoID}`);
      dispatch({ type: actionTypes.overReq });
      await getProducts({});
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
    deleteImageProduct,
    productErrors: state.errors,
    productRequesting: state.sendingReq,
  };
};
