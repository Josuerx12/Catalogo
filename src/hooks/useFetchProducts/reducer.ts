/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Product,
  useFetchProducts,
} from "../../interfaces/product/ProductInterface";
import * as actionTypes from "./actionTypes";

export const initialState: useFetchProducts = {
  products: undefined,
  loading: false,
  errors: undefined,
};

type actions =
  | { type: "LOADING" }
  | { type: "FETCHED"; payload?: Product }
  | { type: "ERROR"; payload?: any };

export const reducer = (state: useFetchProducts, action: actions) => {
  switch (action.type) {
    case actionTypes.loading:
      return { ...state, loading: true };
    case actionTypes.fetched:
      return { ...state, products: action.payload, loading: false };
    case actionTypes.error:
      return { ...state, errors: action.payload, loading: false };
    default:
      return { ...state };
  }
};
