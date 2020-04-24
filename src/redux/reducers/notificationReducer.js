import {
  CLOSE_NOTIFICATION,
  OPEN_ERROR_NOTIFICATION,
  OPEN_SUCCESS_NOTIFICATION,
} from "./../actions/actionTypes";

const initialState = {
  open: false,
  message: "",
  type: "",
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_ERROR_NOTIFICATION:
      return { open: true, type: "error", message: action.payload };
      break;
    case OPEN_SUCCESS_NOTIFICATION:
      return { open: true, type: "success", message: action.payload };
      break;
    case CLOSE_NOTIFICATION:
      return initialState;
      break;
    default:
      return initialState;
      break;
  }
}
