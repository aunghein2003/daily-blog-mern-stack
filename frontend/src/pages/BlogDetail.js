import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletBlog, getAllBlogs, reset } from "../features/blog/blogSlice";
import { toast } from "react-toastify";
import CategoryComponent from "../components/CategoryComponent";
import Avatar from "react-avatar";
import ClipLoader from "react-spinners/ClipLoader";
import { FiMoreVertical } from "react-icons/fi";
import Modal from "../components/Modal";
import axios from "axios";

function BlogDetail() {
  const { blogId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { blogs, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.blog
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (isError) {
      toast(message);
    }

    if (isSuccess) {
      dispatch(reset());
    }
  }, [blogs, isSuccess, isError, message, dispatch]);

  useEffect(() => {
    dispatch(getAllBlogs());
    return () => dispatch(reset());
  }, [dispatch]);

  const blog = blogs?.find((b) => b._id === blogId);
  const blogOwner = user?._id === blog?.author._id;

  const onDelete = () => {
    dispatch(deletBlog(blogId));
    navigate("/");
  };

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
    <div className="w-full mt-5 md:px-48 px-16 flex justify-between align-top">
      <div className="md:w-2/3 w-full pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar
              name={blog?.author.username}
              size={50}
              textSizeRatio={2}
              round={true}
              color="green"
              className="mr-2"
            />
            <div className="flex flex-col ml-3">
              <h3 className="text-xl font-semibold">{blog?.author.username}</h3>
              <p className="font-semibold text-sm text-gray-400 ">
                {new Date(blog?.createdAt).toLocaleString("en-us", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  hourCycle: "h12",
                  minute: "2-digit",
                  // timeStyle: "short",
                  // dateStyle: "medium",
                })}
              </p>
            </div>
          </div>
          {blogOwner ? <MoreOptions user={user} onDelete={onDelete} /> : null}
        </div>
        <h1 className="text-4xl font-bold my-5">{blog?.title}</h1>
        <div className="w-full md:max-w-md max-w-xs md:h-[30vh] h-[20vh] bg-cyan-400"></div>
        <p>{blog?.content}</p>
      </div>
      <div className="hidden md:block">
        <CategoryComponent />
      </div>
    </div>
  );
}

function MoreOptions({ user, onDelete }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [password, setPassword] = useState("");

  window.onclick = (e) => {
    if (openMenu) {
      setOpenMenu(false);
    }
    if (e.target.matches("#menuicon")) {
      setOpenMenu(!openMenu);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      toast.error("Please enter the password");
    }
    const reqBody = { email: user?.email, password };

    try {
      const response = await axios.post("/api/users/login", reqBody);
      if (response.status === 200) {
        onDelete();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="relative">
      <FiMoreVertical
        id="menuicon"
        className="text-3xl cursor-pointer p-1 rounded-full hover:bg-gray-200 active:bg-gray-100"
      />
      <div
        className={`absolute left-5 top-7 shadow-inner border ${
          openMenu ? `block` : `hidden`
        }`}
      >
        <h3
          className="px-[10px] py-1 text-center cursor-pointer hover:bg-slate-200
         active:bg-slate-50"
        >
          Edit
        </h3>
        <h3
          className="px-[10px] py-1 text-center cursor-pointer hover:bg-slate-200 active:bg-slate-50"
          onClick={() => setOpenModal(true)}
        >
          Delete
        </h3>
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(!openModal)}>
        <h1 className="text-3xl font-semibold text-center mb-[5vh]">
          Confirm Access
        </h1>
        <form className="border-2 p-3 shadow-inner" onSubmit={onSubmit}>
          <label htmlFor="password" className="text-lg text-gray-500">
            Enter your password :
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inline-block w-full mt-2 p-3 rounded-md bg-gray-200"
          />
        </form>
      </Modal>
    </div>
  );
}

export default BlogDetail;
