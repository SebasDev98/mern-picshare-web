import * as types from "./../actions/actionTypes";

const initialState = {
  posts: [],
  postDetails: undefined,
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
      break;
    case types.GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      };
      break;

    case types.SAVE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
      break;

    case types.GET_POST_SUCCESS:
      return {
        ...state,
        postDetails: action.payload,
      };
      break;

    case types.SAVE_LIKE_POST_SUCCESS:
      return {
        ...state,
        postDetails: {
          ...state.postDetails,
          likes: action.payload.post.likes,
          like: action.payload.like,
        },
      };
      break;

    case types.SAVE_VIEW_POST_SUCCESS:
      return {
        ...state,
        postDetails: {
          ...state.postDetails,
          views: action.payload.post.views,
        },
      };
      break;

    case types.SAVE_LIKE_POST_FAIL:
      return {
        ...state,
        postDetails: { ...state.postDetails, like: undefined },
      };
      break;

    case types.SAVE_COMMENT_SUCCESS:
      return {
        ...state,
        postDetails: {
          ...state.postDetails,
          comments: [...state.postDetails.comments, action.payload],
        },
      };
      break;

    default:
      return state;
      break;
  }
}
