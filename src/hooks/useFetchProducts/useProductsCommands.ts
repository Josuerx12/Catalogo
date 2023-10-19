/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { api } from "../../utils/apiConnection";
import * as actionTypes from "./actionTypes";
export const useProductsCommands = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const tokenFromCookies = Cookies.get("refreshToken");
  useEffect(() => {
    getProducts();
  }, [tokenFromCookies]);
  const getProducts = async () => {
    dispatch({ type: actionTypes.loading });
    try {
      const res = await api.get("/products");
      const data = await res.data.payload;

      dispatch({ type: actionTypes.fetched, payload: data.products });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: actionTypes.error,
        payload: error.response.data.payload.errors,
      });
    }
  };
  return {
    getProducts,
    products: state.products,
    loading: state.loading,
    errors: state.errors,
  };
};
