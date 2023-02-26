import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import ClipLoader from "react-spinners/ClipLoader";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const { username, email, password1, password2 } = formData;

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
    if (!username || !email || !password1 || !password2) {
      toast.error("Please enter the fields");
    } else if (password1 === password2) {
      const userData = { username, email, password: password1 };
      dispatch(register(userData));
    } else {
      toast.error("Password does not match!");
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
  }, [user, isError, isSuccess, message, navigate, dispatch]);

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
      <h1 className="block text-center text-2xl font-medium">Register</h1>
      <form
        className="lg:w-1/4 md:w-1/3 w-1/2 border-2 p-8 mt-5 rounded-md shadow-inner flex justify-center items-center flex-col"
        onSubmit={onSubmit}
      >
        <label htmlFor="username" className="self-start text-lg text-gray-500">
          Username :
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={onChange}
          className="block w-full p-3 my-2 text-lg rounded-md bg-gray-200"
        />

        <label htmlFor="email" className="self-start text-lg text-gray-500">
          Email :
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={onChange}
          className="block w-full p-3 my-2 text-lg rounded-md bg-gray-200"
        />

        <label htmlFor="password" className="self-start text-lg text-gray-500">
          Password :
        </label>
        <input
          type="password"
          id="password"
          name="password1"
          value={password1}
          onChange={onChange}
          className="block w-full p-3 my-2 text-lg rounded-md bg-gray-200"
        />

        <label htmlFor="password2" className="self-start text-lg text-gray-500">
          Confirm Password :
        </label>
        <input
          type="password"
          id="password2"
          name="password2"
          value={password2}
          onChange={onChange}
          className="block w-full p-3 my-2 text-lg rounded-md bg-gray-200"
        />
        <button className="block w-2/3 p-2 mt-3 rounded-md text-xl border-2 shadow-inner bg-gray-700 text-slate-50 hover:bg-gray-600 active:bg-gray-700">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Register;
