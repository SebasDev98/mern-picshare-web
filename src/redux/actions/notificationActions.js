import {
  CLOSE_NOTIFICATION,
  OPEN_ERROR_NOTIFICATION,
  OPEN_SUCCESS_NOTIFICATION,
} from "./actionTypes";

export function openSuccesNotification(message) {
  return {
    type: OPEN_SUCCESS_NOTIFICATION,
    payload: message,
  };
}

export function openErrorNotification(message) {
  return {
    type: OPEN_ERROR_NOTIFICATION,
    payload: message,
  };
}

export function closeNotification() {
  return { type: CLOSE_NOTIFICATION };
}
