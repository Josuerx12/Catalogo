/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, useAuthState } from "../../interfaces/user/userInterface";
import * as actionTypes from "./actionTypes";

export const initialState: useAuthState = {
  user: undefined,
  loading: false,
  errors: undefined,
};

type Action =
  | { type: "LOADING" }
  | { type: "LOGOUT" }
  | { type: "ENTERING"; payload?: string }
  | { type: "CLEANERRORS" }
  | { type: "FETCHED"; payload?: User }
  | { type: "ERROR"; payload?: any };

export const reducer = (state: useAuthState, action: Action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return { ...state, loading: true };
    case actionTypes.CLEANERRORS:
      return { ...state, errors: undefined };
    case actionTypes.ENTERING:
      return { ...state, loading: false };
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
