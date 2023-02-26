const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");

//Desc: Get All Blogs
//Routes: /api/blogs
//Access: Public
const GetBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).populate("author", { username: 1 });
  res.status(200).json(blogs);
});

//Desc: Create a Blog
//Routes: /api/blogs
//Access: Private
const SetBlog = asyncHandler(async (req, res) => {
  //Checking jwt token
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized to access");
  }

  //Checking if blog datas include
  if (!Object.keys(req.body).length) {
    res.status(400);
    throw new Error("Please fill the fields");
  }

  const { title, content, category } = req.body;
  const blog = await Blog.create({
    title,
    content,
    category,
    author: req.user.id,
  });
  res.status(201).json(blog);
});

//Desc: Update a Blog
//Routes: /api/blogs/:id
//Access: Private
const UpdateBlog = asyncHandler(async (req, res) => {
  //Checking jwt token
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized to access");
  }

  //Checking if blog datas include
  if (!Object.keys(req.body).length) {
    res.status(400);
    throw new Error("Please fill the fields");
  }

  const blog = await Blog.findById(req.params.id);

  //Check if blog does not exist
  if (!blog) {
    res.status(400);
    throw new Error("Blog not found");
  }

  //Check blog author id and request user id same
  if (blog.author.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Unauthorized");
  }

  //Update a blog
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(Object.assign(updatedBlog, req.body));
});

//Desc: Delete a Blog
//Routes: /api/blogs/:id
//Access: Private
const DeleteBlog = asyncHandler(async (req, res) => {
  //Checking jwt token
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized to access");
  }

  const blog = await Blog.findById(req.params.id);

  //Check if blog does not exist
  if (!blog) {
    res.status(400);
    throw new Error("Blog not found");
  }

  //Check blog author id and request user id
  if (blog.author.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Unauthorized");
  }

  //Delete a blog
  await blog.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  GetBlogs,
  SetBlog,
  UpdateBlog,
  DeleteBlog,
};
