/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { useEffect, useReducer } from "react";
import * as actionTypes from "./actionTypes";
import { api } from "../../utils/apiConnection";
import {
  loginCredentials,
  registerCredentials,
  authPayload,
  userPayload,
} from "../../interfaces/user/userInterface";
import { initialState, reducer } from "./reducer";

export const useAuth = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const tokenFromCookies = Cookies.get("refreshToken");
  useEffect(() => {
    if (tokenFromCookies) {
      dispatch({ type: actionTypes.ENTERING, payload: tokenFromCookies });
    }
    if (state.token) {
      getUser();
    }
  }, [!state.token]);

  console.log(state);

  const getUser = async () => {
    dispatch({ type: actionTypes.LOADING });
    try {
      const res = await api.get("/auth/user", {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      const data: userPayload = await res.data.payload;

      dispatch({ type: actionTypes.FETCHED, payload: data.user });
    } catch (error: any) {
      dispatch({
        type: actionTypes.ERROR,
        payload: error.response.data.payload.error,
      });
    }
  };

  const login = async (credentials: loginCredentials) => {
    const { email, password } = credentials;
    dispatch({ type: actionTypes.LOADING });

    try {
      const res = await api.post("/auth/login", { email, password });
      const data: authPayload = await res.data;

      Cookies.set("refreshToken", data.payload.token, { expires: 0.5 });
      dispatch({ type: actionTypes.ENTERING, payload: data.payload.token });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: actionTypes.ERROR,
        payload: error.response.data.payload.errors,
      });
    }
  };

  const register = async (credentials: registerCredentials) => {
    const { name, email, password, confirmPassword } = credentials;
    dispatch({ type: actionTypes.LOADING });
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      const data = await res.data;

      Cookies.set("refreshToken", data.payload.token, { expires: 0.5 });
      dispatch({ type: actionTypes.ENTERING, payload: data.payload.token });
    } catch (error: any) {
      dispatch({
        type: actionTypes.ERROR,
        payload: error.response.data.payload.error,
      });
    }
  };

  // const editUser = async (newCredentials) => {};

  const recovery = async (email: string) => {
    try {
      await api.post("/auth/recovery", { email });
      alert("Nova senha enviada por e-mail.");
    } catch (error: any) {
      dispatch({
        type: actionTypes.ERROR,
        payload: error.response.data.payload.error,
      });
    }
  };

  const logout = () => {
    dispatch({ type: actionTypes.FETCHED, payload: undefined });
  };
  return {
    login,
    register,
    getUser,
    logout,
    recovery,
    user: state.user,
    loading: state.loading,
    errors: state.errors,
  };
};
