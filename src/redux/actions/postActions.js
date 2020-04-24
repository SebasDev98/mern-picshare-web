import axios from "axios";
import * as types from "./actionTypes";
import { beginApiCall } from "./apiStatusActions";
import {
  openSuccesNotification,
  openErrorNotification,
} from "./notificationActions";
const API_URL = process.env.REACT_APP_API_POST_URL;

export function getPostsSuccess(posts) {
  return { type: types.GET_POSTS_SUCCESS, payload: posts };
}

export function getPostSuccess(post) {
  return { type: types.GET_POST_SUCCESS, payload: post };
}

export function saveCommentSuccess(comment) {
  return { type: types.SAVE_COMMENT_SUCCESS, payload: comment };
}

export function saveLikePostSuccess(data) {
  return { type: types.SAVE_LIKE_POST_SUCCESS, payload: data };
}

export function saveViewPostSuccess(data) {
  return { type: types.SAVE_VIEW_POST_SUCCESS, payload: data };
}

export function saveLikePostFail() {
  return { type: types.SAVE_LIKE_POST_FAIL };
}

export function savePostSuccess(post) {
  return { type: types.SAVE_POST_SUCCESS, payload: post };
}

//Thunks
export function getPosts() {
  return async (dispatch) => {
    dispatch(beginApiCall());
    try {
      const response = await axios.get(API_URL);

      dispatch(getPostsSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(
        openErrorNotification(
          (error.response && error.response.data.message) ||
            "An Error Has Ocurred"
        )
      );
    }
  };
}

export function getPost(postId) {
  return async (dispatch, getState) => {
    dispatch(beginApiCall());
    const { token } = getState().user;
    try {
      const response = await axios.get(`${API_URL}/${postId}`, {
        headers: { Authorization: token },
      });

      dispatch(
        getPostSuccess({
          ...response.data.post,
          comments: response.data.comments,
          like: response.data.like,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        openErrorNotification(
          (error.response && error.response.data.message) ||
            "An Error Has Ocurred"
        )
      );
    }
  };
}

export function savePost(post) {
  return async (dispatch, getState) => {
    const { token } = getState().user;
    const formData = new FormData();
    formData.set("text", post.text);

    formData.append("postImg", post.postImg);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(savePostSuccess(response.data.post));
    } catch (error) {
      console.log(error);
      dispatch(
        openErrorNotification(
          (error.response && error.response.data.message) ||
            "An Error Has Ocurred"
        )
      );
    }
  };
}

export function saveComment(postId, comment) {
  return async (dispatch, getState) => {
    dispatch(beginApiCall());
    const { token } = getState().user;
    try {
      const response = await axios.post(
        `${API_URL}/${postId}/comments`,
        comment,
        {
          headers: { Authorization: token },
        }
      );

      dispatch(saveCommentSuccess(response.data.comment));
    } catch (error) {
      console.log(error);
      dispatch(
        openErrorNotification(
          (error.response && error.response.data.message) ||
            "An Error Has Ocurred"
        )
      );
    }
  };
}

export function saveLikePost(postId) {
  return async (dispatch, getState) => {
    const { token } = getState().user;

    try {
      const response = await axios.post(`${API_URL}/${postId}/likes`, null, {
        headers: { Authorization: token },
      });

      dispatch(saveLikePostSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(saveLikePostFail());
      dispatch(
        openErrorNotification(
          (error.response && error.response.data.message) ||
            "An Error Has Ocurred"
        )
      );
    }
  };
}

export function saveViewPost(postId) {
  return async (dispatch, getState) => {
    const { token } = getState().user;

    try {
      const response = await axios.post(`${API_URL}/${postId}/views`, null, {
        headers: { Authorization: token },
      });

      dispatch(saveViewPostSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}
