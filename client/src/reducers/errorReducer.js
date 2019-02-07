import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {};
// I Dispatch actions to this reducer, and test with a switch
export default function(state = initialState, action) {
  switch (action.type) {
    // Looks for GET_ERRORS & returns payload errors
    case GET_ERRORS:
      // Payload will include errors object from server
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
