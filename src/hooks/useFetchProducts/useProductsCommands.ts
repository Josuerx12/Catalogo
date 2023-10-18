import Cookies from "js-cookie";
import { useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducer";
export const useProductsCommands = () => {
  const tokenFromCookies = Cookies.get("refreshToken");
  useEffect(() => {
    getProducts();
  }, [tokenFromCookies]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const getProducts = async () => {};
  return;
};
