import React from "react";
import Blog from "./Blog";
import PropTypes from "prop-types";

const sortedBlogs = (blogs) => {
  blogs.sort((a, b) => {
    return b.likes - a.likes;
  });
  return blogs;
};

const ShowBlogs = ({ blogs, handleBlogRemove }) => (
  <div>
    {sortedBlogs(blogs).map((blog) => (
      <Blog key={blog.id} blog={blog} handleBlogRemove={handleBlogRemove} />
    ))}
  </div>
);

ShowBlogs.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ShowBlogs;
