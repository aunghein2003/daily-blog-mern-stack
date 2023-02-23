import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";

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
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-full mt-4 flex justify-center items-center">
      <div className="lg:w-1/4  w-1/2 mt-4 flex justify-center items-center flex-col">
        <h1 className="w-full text-center text-2xl font-medium block">
          Register
        </h1>
        <form className="w-full" onSubmit={onSubmit}>
          <input
            type="text"
            className="w-full h-11 p-4 mt-5 text-lg border-2 border-gray-800"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChange}
          />
          <input
            type="text"
            className="w-full h-11 p-4 mt-5 text-lg border-2 border-gray-800"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
          />
          <input
            type="password"
            className="w-full h-11 p-4 mt-5 text-lg border-2 border-gray-800"
            placeholder="Password"
            name="password1"
            value={password1}
            onChange={onChange}
          />
          <input
            type="password"
            className="w-full h-11 p-4 mt-5 text-lg border-2 border-gray-800"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
          <button className="w-full p-2 mt-7 text-lg border-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-800  text-slate-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
