import React, { useState } from "react";
import Button from "./Button";
import PropTypes from "prop-types";
import { likeBlogCreator } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ShowBlogInfo = ({ blog, handleBlogRemove }) => {
  const [buttonText, setButtonText] = useState("view");
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();
  const blogSelector = (state) => state.blog;
  const blogs = useSelector(blogSelector);
  const currentLikes = blogs.find((b) => b.id === blog.id).likes;

  const handleButtonClick = () => {
    setShowAll(!showAll);

    setButtonText(showAll ? "view" : "hide");
  };

  const handleLikeButtonClick = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    dispatch(likeBlogCreator(blog.id, updatedBlog))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const isLoggedInUserBlogOwner = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log("USER: ", user);
      console.log("BLOG: ", blog);
      const isValidUser = user.username === blog.user.username;
      if (isValidUser) {
        return true;
      }
    }
    return false;
  };

  return (
    <div>
      <p id="blog-title">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        <Button
          id={"show-blog-button"}
          text={buttonText}
          onButtonClick={handleButtonClick}
        />
      </p>
      {showAll && (
        <div>
          <p>{blog.url}</p>
          <p id="likes">
            likes {currentLikes}
            <Button
              id={"like-button"}
              text={"like"}
              onButtonClick={handleLikeButtonClick}
            />
          </p>
          <p>{blog.user.name}</p>
          {isLoggedInUserBlogOwner() && (
            <div>
              <Button
                id={"remove-button"}
                text={"remove"}
                onButtonClick={() => handleBlogRemove(blog)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Blog = ({ blog, handleBlogRemove }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div>
        <ShowBlogInfo blog={blog} handleBlogRemove={handleBlogRemove} />
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};
export default Blog;
