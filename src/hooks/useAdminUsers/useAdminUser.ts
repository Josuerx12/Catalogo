/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer, useEffect } from "react";
import { initialState, reducer } from "./reducer";
import Cookies from "js-cookie";
import * as actionTypes from "./actionTypes";
import { api } from "../../utils/apiConnection";
import { Auth } from "../../context/authContext";

export const useAdminUsers = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = Auth();
  const token = Cookies.get("refreshToken");

  useEffect(() => {
    getUsers();
  }, [user && user.admin]);

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

  const deleteUser = async (id: string) => {
    dispatch({ type: actionTypes.sending });
    try {
      const res = await api.delete(`/auth/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.payload);
      await getUsers();
      dispatch({ type: actionTypes.reqResult });
    } catch (error: any) {
      console.log(error);
      dispatch({ type: actionTypes.reqResult });
      dispatch({
        type: actionTypes.errors,
        payload: error.response.data.payload.errors,
      });
    }
  };

  const editUser = async (id: string, credentials: FormData) => {
    dispatch({ type: actionTypes.sending });
    try {
      const res = await api.patch(`/auth/editUser/${id}`, credentials, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.payload);
      await getUsers();
      dispatch({ type: actionTypes.reqResult });
    } catch (error: any) {
      console.log(error);
      dispatch({ type: actionTypes.reqResult });
      dispatch({
        type: actionTypes.errors,
        payload: error.response.data.payload.errors,
      });
    }
  };
  return {
    users: state.users,
    loading: state.loading,
    userErrors: state.errors,
    userRequesting: state.sendingReq,
    deleteUser,
    editUser,
  };
};
