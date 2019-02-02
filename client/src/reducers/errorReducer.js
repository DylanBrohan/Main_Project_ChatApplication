import { GET_ERRORS } from "../actions/types";

const initialState = {};
// I Dispatch actions to this reducer, and test with a switch
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      // Payload will include errors object from server
      return action.payload;
    default:
      return state;
  }
}
