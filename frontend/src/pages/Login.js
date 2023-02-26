import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import ClipLoader from "react-spinners/ClipLoader";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("E-mail and Password cannot be empty!");
    } else {
      const userData = { email, password };
      dispatch(login(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, dispatch, navigate, isError, isSuccess, message]);

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
    <div className="w-full mt-4 flex justify-center items-center flex-col">
      <h1 className=" text-center text-2xl font-medium block">Login</h1>
      <form
        className="border-2 p-8 mt-5 rounded-md shadow-inner flex justify-center items-center flex-col"
        onSubmit={onSubmit}
      >
        <label htmlFor="email" className="self-start text-lg text-gray-500">
          Email :
        </label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={onChange}
          className="block w-full p-3 my-2 text-lg rounded-md bg-gray-200"
        />

        <label htmlFor="password" className="self-start text-lg text-gray-500">
          Password :
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={onChange}
          className="block w-full p-3 my-2 text-lg rounded-md bg-gray-200"
        />
        <button className="block w-2/3 p-2 mt-3 rounded-md text-xl border-2 shadow-inner bg-gray-700 text-slate-50 hover:bg-gray-600 active:bg-gray-700">
          Submit
        </button>
        <p className=" text-center mt-3">
          If you don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-lg hover:underline"
          >
            Create One
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
