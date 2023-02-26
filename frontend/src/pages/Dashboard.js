import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllBlogs, reset } from "../features/blog/blogSlice";
import BlogCard from "../components/BlogCard";
import CategoryComponent from "../components/CategoryComponent";
import ClipLoader from "react-spinners/ClipLoader";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { blogs, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.blog
  );

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
    <div className="w-full mt-6">
      <div className="w-full mt-3 flex justify-around items-top md:flex-row flex-col-reverse">
        <div className="w-full md:w-2/3 ">
          {blogs?.map((blog) => (
            <div key={blog._id}>
              <BlogCard data={blog} />
            </div>
          ))}
        </div>
        <div className=" w-full py-3 px-9 border-b-2 md:w-1/3 md:py-4 md:px-12 md:border-b-0">
          <CategoryComponent />
        </div>
      </div>
      {user ? (
        <div
          className="w-20 h-20 p-3  absolute right-10 bottom-10 rounded-full bg-lime-400 hover:bg-lime-500 active:bg-lime-400 cursor-pointer text-5xl text-center text-gray-100"
          onClick={() => navigate("/new")}
        >
          +
        </div>
      ) : null}
    </div>
  );
}

export default Dashboard;
