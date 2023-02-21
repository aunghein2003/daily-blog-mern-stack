//Desc: Get All Blogs
//Routes: /api/blogs
//Access: Public
const GetBlogs = (req, res) => {
  console.log("Get blog");
};

//Desc: Create a Blog
//Routes: /api/blogs
//Access: Private
const SetBlog = (req, res) => {
  console.log("Set blog");
};

//Desc: Update a Blog
//Routes: /api/blogs/:id
//Access: Private
const UpdateBlog = (req, res) => {
  console.log("Update blog");
};

//Desc: Delete a Blog
//Routes: /api/blogs/:id
//Access: Private
const DeleteBlog = (req, res) => {
  console.log("Delete blog");
};

module.exports = {
  GetBlogs,
  SetBlog,
  UpdateBlog,
  DeleteBlog,
};
