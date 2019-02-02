import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {}
};
// I Dispatch actions to this reducer, and test with a switch
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        //   Current State
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        // The users information is the actual payload
        user: action.payload
      };
    default:
      return state;
  }
}
