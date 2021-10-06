import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationReducer from "./notificationReducer";
import thunk from "redux-thunk";
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";

const reducer = combineReducers({
  notification: notificationReducer,
  blog: blogReducer,
  user: userReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
