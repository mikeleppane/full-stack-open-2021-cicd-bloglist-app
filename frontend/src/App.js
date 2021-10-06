import React, { useEffect, useState } from "react";
import Notification from "./components/Notification";
import Login from "./components/Login";
import ShowBlogs from "./components/ShowBlogs";
import CreateNewBlog from "./components/CreateNewBlog";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationCreator } from "./reducers/notificationReducer";
import {
  initBlogsCreator,
  newBlogCreator,
  removeBlogCreator,
} from "./reducers/blogReducer";
import { loggedInUserCreator, userCreator } from "./reducers/userReducer";
import { Route, Switch } from "react-router-dom";
import ShowUsers from "./components/ShowUsers";
import IndividualUser from "./components/IndividualUser";
import IndividualBlog from "./components/IndividualBlog";
import Menu from "./components/Menu";
import { CssBaseline } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();
  const notifierSelector = (state) => state.notification;
  const blogSelector = (state) => state.blog;
  const notification = useSelector(notifierSelector);
  const blogs = useSelector(blogSelector);
  const userSelector = (state) => state.user;
  const user = useSelector(userSelector);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(initBlogsCreator());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loggedInUserCreator());
  }, [dispatch]);

  const handleUserLogin = async (event) => {
    event.preventDefault();
    dispatch(userCreator(username, password))
      .then(() => {})
      .catch((error) => console.log(error));
    setUsername("");
    setPassword("");
  };

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const createBlog = async (blog) => {
    if (!blog.title || !blog.author || !blog.url) {
      dispatch(
        setNotificationCreator(
          `blog title, author and url must be set before creation!`,
          "error"
        )
      );
      return;
    }
    dispatch(newBlogCreator(blog))
      .then((response) => {
        console.log(response);
        dispatch(
          setNotificationCreator(
            `a new blog ${blog.title} by ${blog.author} added`,
            "success"
          )
        );
      })
      .catch((error) => console.log(error));
  };

  const handleRemoveButtonClick = async (blog) => {
    if (window.confirm(`Do you want to remove blog ${blog.title}?`)) {
      dispatch(removeBlogCreator(blog.id))
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div style={{ margin: "10px" }}>
      <CssBaseline />
      <Notification message={notification.message} type={notification.type} />
      {user === null && (
        <div>
          <h2>Log in to application</h2>
          <Login
            handleLogin={handleUserLogin}
            handleUsernameOnChange={handleUsernameChange}
            handlePasswordOnChange={handlePasswordChange}
            username={username}
            password={password}
          />
        </div>
      )}
      {user !== null && (
        <div>
          <Menu name={`${user.name}`} />
          <h2>Blog app</h2>
          <Switch>
            <Route path="/users/:id">
              <IndividualUser />
            </Route>
            <Route path="/users">
              <ShowUsers />
            </Route>
            <Route path="/blogs/:id">
              <IndividualBlog />
            </Route>
            <Route path="/">
              <Togglable buttonLabel={"create new blog"}>
                <CreateNewBlog createBlog={createBlog} />
              </Togglable>
              <ShowBlogs
                blogs={blogs}
                handleBlogRemove={handleRemoveButtonClick}
              />
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
};
export default App;
