import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
const middleware = [thunk];
const initialState = {};
// ---Store That Stores the Entire State of this Applcation---

//First parametre [] is reducer
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // Implements Redux extension
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
