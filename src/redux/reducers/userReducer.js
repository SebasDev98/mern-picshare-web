import * as types from "./../actions/actionTypes";
import { getUserAndToken } from "./../../auth/auth";

const initialState = getUserAndToken();

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
      break;

    case types.USER_SIGNOUT_SUCCESS:
      return {
        ...state,
        user: undefined,
        token: undefined,
      };
      break;

    default:
      return state;
      break;
  }
}
