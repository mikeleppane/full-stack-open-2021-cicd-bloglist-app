import blogService from "../services/blogs";
import loginService from "../services/login";
import { setNotificationCreator } from "./notificationReducer";

const initialState = { user: null };

const handleLoggedInUserAction = (state, data) => {
  return data;
};

const handleLoginUserAction = (state, data) => {
  return data;
};

export const loggedInUserCreator = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch({
        type: "LOGGED_IN_USER",
        data: user,
      });
    } else {
      dispatch({
        type: "LOGGED_IN_USER",
        data: null,
      });
    }
  };
};

export const userCreator = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch({
        type: "LOGIN_USER",
        data: user,
      });
      console.log("logging in with", username, password);
    } catch (exception) {
      dispatch(setNotificationCreator("wrong username or password", "error"));
      setTimeout(() => {
        dispatch(setNotificationCreator(null, null));
      }, 5000);
    }
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return handleLoggedInUserAction(state, action.data);
    case "LOGIN_USER":
      return handleLoginUserAction(state, action.data);
    default:
      return state;
  }
};

export default userReducer;
