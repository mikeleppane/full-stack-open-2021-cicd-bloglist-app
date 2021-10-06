const _ = require("lodash");

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  return blogs.map((blog) => blog.likes).reduce((a, b) => a + b);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const likes = blogs.map((blog) => blog.likes);
  const blog = blogs[likes.indexOf(Math.max(...likes))];
  return { title: blog.title, author: blog.author, likes: blog.likes };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  return _.chain(blogs)
    .groupBy("author")
    .map((objs, key) => ({
      author: key,
      blogs: objs.length,
    }))
    .orderBy("blogs", "desc")
    .head()
    .value();
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  return _.chain(blogs)
    .groupBy("author")
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, "likes"),
    }))
    .orderBy("likes", "desc")
    .head()
    .value();
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs,
};
