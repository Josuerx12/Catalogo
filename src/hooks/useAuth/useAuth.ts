/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { useReducer } from "react";
import * as actionTypes from "./actionTypes";
import { api } from "../../config/apiConnection";
import {
  loginCredentials,
  registerCredentials,
  authPayload,
  userPayload,
} from "../../interfaces/user/userInterface";
import { initialState, reducer } from "./reducer";

export const useAuth = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getUser = async () => {
    dispatch({ type: actionTypes.LOADING });
    try {
      const res = await api.get("/auth/user");
      const data: userPayload = await res.data.payload;
      dispatch({ type: actionTypes.FETCHED, payload: data.user });
    } catch (error: any) {
      api.defaults.headers.common.Authorization = ``;
      dispatch({
        type: actionTypes.ERROR,
        payload: error.response.data.payload.errors,
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
      api.defaults.headers.common.Authorization = `Bearer ${data.payload.token}`;

      await getUser();
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
      await getUser();
    } catch (error: any) {
      dispatch({
        type: actionTypes.ERROR,
        payload: error?.response?.data.payload.errors,
      });
    }
  };

  const editUser = async (formData: FormData) => {
    try {
      await api.patch("/auth/editUser", formData);
      await getUser();
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: actionTypes.ERROR,
        payload: error.response.data.payload.errors,
      });
    }
  };

  const recovery = async (email: string) => {
    try {
      await api.post("/auth/recovery", { email });
      alert(
        "Nova senha enviada por e-mail, faça login utilizando a nova senha."
      );
      dispatch({ type: actionTypes.ENTERING });
    } catch (error: any) {
      dispatch({
        type: actionTypes.ERROR,
        payload: error.response.data.payload.errors,
      });
    }
  };

  const logout = () => {
    dispatch({ type: actionTypes.LOGOUT });
    Cookies.remove("refreshToken");
  };

  const cleanErrors = () => {
    dispatch({ type: actionTypes.CLEANERRORS });
  };
  return {
    login,
    register,
    editUser,
    getUser,
    logout,
    cleanErrors,
    recovery,
    user: state.user,
    loading: state.loading,
    errors: state.errors,
  };
};
