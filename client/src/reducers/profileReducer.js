import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        //   Current state
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        //   Current state
        ...state,
        // payload passed from profileAction - payload goes from null - that user
        profile: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        //   Current state
        ...state,
        // payload passed from profileAction - payload goes from null - that user
        profile: null
      };
    default:
      return state;
  }
}
