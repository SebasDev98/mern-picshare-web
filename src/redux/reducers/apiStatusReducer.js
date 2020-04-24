import * as types from "./../actions/actionTypes";

const initialState = 0;

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiCallStatusReducer(state = initialState, action) {
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1;
  } else if (actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }

  return state;
}
