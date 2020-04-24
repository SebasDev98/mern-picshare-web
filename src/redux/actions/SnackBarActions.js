import * as types from "./actionTypes";

export function openSnackBar(payload) {
  return { type: types.OPEN_SNACKBAR, payload };
}
