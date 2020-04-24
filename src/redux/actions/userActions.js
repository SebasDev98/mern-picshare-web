import axios from "axios";
import * as types from "./actionTypes";
import { beginApiCall } from "./apiStatusActions";
import { saveUserAndToken, deleteUserAndToken } from "./../../auth/auth";
import { openErrorNotification } from "./notificationActions";

const API_URL = process.env.REACT_APP_API_USER_URL;

export function loginSuccess(user, token) {
  return { type: types.USER_LOGIN_SUCCESS, payload: { user, token } };
}

export function signUpSuccess(user, token) {
  return { type: types.USER_SIGNUP_SUCCESS, payload: { user, token } };
}

export function verifyTokenSuccess() {
  return { type: types.USER_VERIFY_TOKEN_SUCCESS };
}

export function login({ email, password }) {
  return async (dispatch) => {
    dispatch(beginApiCall());
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      saveUserAndToken(response.data.user, response.data.token);
      dispatch(loginSuccess(response.data.user, response.data.token));
      return { success: true };
    } catch (error) {
      console.log(error);
      dispatch(
        openErrorNotification(
          (error.response && error.response.data.message) ||
            "An error has occurred"
        )
      );

      return {
        success: false,
      };
    }
  };
}

export function verifyToken() {
  return async (dispatch, getState) => {
    const { token } = getState().user;
    dispatch(beginApiCall());
    try {
      const response = await axios.get(`${API_URL}/verify-token`, {
        headers: { Authorization: token },
      });

      dispatch(verifyTokenSuccess());
    } catch (error) {
      console.log(error);
      dispatch(signOut());
    }
  };
}

export function signOut() {
  deleteUserAndToken();
  return { type: types.USER_SIGNOUT_SUCCESS };
}

export function signUp({ email, password, userName }) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        userName,
      });
      saveUserAndToken(response.data.user, response.data.token);
      dispatch(signUpSuccess(response.data.user, response.data.token));
      return { success: true };
    } catch (error) {
      console.log(error);
      dispatch(
        openErrorNotification(
          (error.response && error.response.data.message) ||
            "An error has occurred"
        )
      );

      return {
        success: false,
      };
    }
  };
}
