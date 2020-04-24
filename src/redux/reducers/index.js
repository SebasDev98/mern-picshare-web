import { combineReducers } from "redux";

import posts from "./postReducer";
import user from "./userReducer";
import apiCallInProgress from "./apiStatusReducer";
import notification from "./notificationReducer";
const rootReducer = combineReducers({
  posts,
  apiCallInProgress,
  user,
  notification,
});

export default rootReducer;
