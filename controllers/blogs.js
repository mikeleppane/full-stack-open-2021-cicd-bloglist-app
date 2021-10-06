const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blog.toJSON());
});

blogsRouter.get("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blog.comments);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const body = request.body;
  if (!body.comment) {
    return response.status(400).json({
      error: "comment is missing",
    });
  }
  const comments = [...blog.comments, body.comment];

  const updatedBlog = { comments: comments };

  const newBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
  }).populate("user", { username: 1, name: 1 });
  response.status(200).json(newBlog);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = request.user;

  console.log("USER CREATED BLOG: ", user);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const user = request.user;
  const isValidUser = user.id.toString() === blog.user.toString();
  if (isValidUser) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    return response
      .status(401)
      .json({ error: "Invalid user. Cannot delete blog." });
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const updatedBlog = {};

  if (!body.likes) {
    return res.status(400).json({
      error: "likes is missing",
    });
  } else {
    updatedBlog.likes = body.likes;
  }
  if (body.title) {
    updatedBlog.title = body.title;
  }
  if (body.author) {
    updatedBlog.author = body.author;
  }
  if (body.url) {
    updatedBlog.url = body.url;
  }

  const newBlog = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, {
    new: true,
  }).populate("user", { username: 1, name: 1 });
  res.status(200).json(newBlog);
});

module.exports = blogsRouter;
