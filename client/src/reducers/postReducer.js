import {
  ADD_POST,
  POST_LOADING,
  DELETE_POST,
  GET_POSTS,
  GET_POST
} from "../actions/types";
// Initial State
const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  // Rules for Posts state management
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    //   Id comes through the payload in the profile actions component
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
