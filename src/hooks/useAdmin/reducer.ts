/* eslint-disable @typescript-eslint/no-explicit-any */
import { InitialState } from "../../interfaces/admin/AdminInterface";
import { User } from "../../interfaces/user/UserInterface";
import * as actionTypes from "./actionTypes";

export const initialState = {
  users: undefined,
  loading: false,
  errors: undefined,
};

type Action =
  | { type: "LOADING" }
  | { type: "FETCHED"; payload?: User[] }
  | { type: "ERRO"; payload?: any };

export const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case actionTypes.loading:
      return { ...state, loading: true };
    case actionTypes.fetched:
      return { ...state, loading: false, users: action.payload };
    case actionTypes.errors:
      return { ...state, loading: false, errors: action.payload };
    default:
      return { ...state };
  }
};
