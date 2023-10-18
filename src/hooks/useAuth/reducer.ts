/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, useAuthState } from "../../interfaces/user/userInterface";
import * as actionTypes from "./actionTypes";

export const initialState: useAuthState = {
  user: undefined,
  token: undefined,
  loading: false,
  errors: undefined,
};

type Action =
  | { type: "LOADING" }
  | { type: "LOGOUT" }
  | { type: "ENTERING"; payload?: string }
  | { type: "FETCHED"; payload?: User }
  | { type: "ERROR"; payload?: any };

export const reducer = (state: useAuthState, action: Action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return { ...state, loading: true };
    case actionTypes.ENTERING:
      return { ...state, token: action.payload, loading: false };
    case actionTypes.FETCHED:
      return {
        ...state,
        user: action.payload,
        loading: false,
        errors: undefined,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: undefined,
        loading: false,
        errors: undefined,
        token: undefined,
      };
    case actionTypes.ERROR:
      return { ...state, errors: action.payload, loading: false };
    default:
      return { ...state };
  }
};
