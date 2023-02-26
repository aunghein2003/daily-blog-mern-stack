import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createBlog, reset } from "../features/blog/blogSlice";
import ClipLoader from "react-spinners/ClipLoader";

function BlogCreate() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const { title, content, category } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { blogs, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.blog
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !category) {
      toast.error("Please enter the fields");
    } else {
      const author = user._id;
      const blogData = { title, content, category, author };
      dispatch(createBlog(blogData));
    }
  };

  useEffect(() => {
    if (isError) {
      toast(message);
    }

    if (isSuccess) {
      navigate("/");
    }

    dispatch(reset());
  }, [blogs, isSuccess, isError, message, dispatch, navigate]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[70vh]">
        <ClipLoader
          color="black"
          loading={isLoading}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <form className="w-auto h-auto py-5 px-10" onSubmit={onSubmit}>
      <h1 className="text-2xl font-semibold mb-5">Create a Blog</h1>
      <label htmlFor="title" className="text-lg text-gray-500">
        Title:
      </label>
      <input
        id="title"
        type="text"
        name="title"
        value={title}
        onChange={onChange}
        className="block bg-gray-200 md:w-1/3 w-2/3 p-3 text-xl mb-3 rounded-md"
      />
      <label htmlFor="category" className="text-lg text-gray-500">
        Category:
      </label>
      <input
        id="category"
        type="text"
        name="category"
        value={category}
        onChange={onChange}
        className="block bg-gray-200 md:w-1/3 w-2/3 p-3 text-xl mb-3 rounded-md"
      />
      <label htmlFor="content" className="text-lg text-gray-500">
        Content:
      </label>
      <textarea
        rows={5}
        cols={10}
        id="content"
        type="text"
        name="content"
        value={content}
        onChange={onChange}
        className="block bg-gray-200 md:w-1/3 w-2/3 p-3 mb-3 text-xl rounded-md"
      />
      <button className="lg:w-1/12 md:w-1/6 w-1/6  border p-3 text-xl rounded-md text-slate-100 bg-slate-900 hover:bg-slate-800">
        Create
      </button>
    </form>
  );
}

export default BlogCreate;
