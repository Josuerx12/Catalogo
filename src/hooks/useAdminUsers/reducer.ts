/* eslint-disable @typescript-eslint/no-explicit-any */

import { InitialState } from "../../interfaces/admin/AdminUserInterface";
import { User } from "../../interfaces/user/userInterface";
import * as actionTypes from "./actionTypes";

export const initialState = {
  users: undefined,
  loading: false,
  sendingReq: false,
  errors: undefined,
};

type Action =
  | { type: "LOADING" }
  | { type: "SENDING" }
  | { type: "REQRESULT" }
  | { type: "CLEANERRORS" }
  | { type: "FETCHED"; payload?: User[] }
  | { type: "ERRO"; payload?: any };

export const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case actionTypes.loading:
      return { ...state, loading: true };
    case actionTypes.sending:
      return { ...state, sendingReq: true };
    case actionTypes.reqResult:
      return { ...state, sendingReq: false };
    case actionTypes.fetched:
      return { ...state, loading: false, users: action.payload };
    case actionTypes.errors:
      return { ...state, loading: false, errors: action.payload };
    case actionTypes.cleanErrors:
      return { ...state, errors: undefined };
    default:
      return { ...state };
  }
};
