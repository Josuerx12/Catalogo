/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer, useEffect } from "react";
import { initialState, reducer } from "./reducer";
import Cookies from "js-cookie";
import * as actionTypes from "./actionTypes";
import { api } from "../../utils/apiConnection";

export const useAdmin = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = Cookies.get("refreshToken");

  useEffect(() => {
    getUsers();
  }, [token]);

  const getUsers = async () => {
    dispatch({ type: actionTypes.loading });
    try {
      const res = await api.get("/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.data;
      dispatch({ type: actionTypes.fetched, payload: data.payload.users });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: actionTypes.errors,
        payload: error.response.data.payload.errors,
      });
    }
  };
  return { users: state.users, loading: state.loading, errors: state.errors };
};
