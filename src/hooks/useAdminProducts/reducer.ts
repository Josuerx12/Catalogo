import { InitialState } from "../../interfaces/admin/AdminProductInterface";
import * as actionTypes from "./actionTypes";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const initialState: InitialState = {
  sendingReq: false,
  errors: undefined,
};

type Action =
  | { type: "SENDINGREQ" }
  | { type: "OVERREQ" }
  | { type: "ERRORS"; payload: any };

export const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case actionTypes.sendingReq:
      return { ...state, sendingReq: true };
    case actionTypes.overReq:
      return { ...state, sendingReq: false };
    case actionTypes.errors:
      return { ...state, errors: action.payload };
  }
};
