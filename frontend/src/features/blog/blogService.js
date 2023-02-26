import axios from "axios";

const API_URL = "api/blogs";

const getAllBlogs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createBlog = async (blogData, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, blogData, config);
  return response.data;
};

const deletBlog = async (id, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const blogService = {
  getAllBlogs,
  createBlog,
  deletBlog,
};

export default blogService;
