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
    <div className="w-full mt-4 flex justify-center items-center">
      <div className="lg:w-1/4 w-1/2 mt-4 flex justify-center items-center flex-col">
        <h1 className="w-full text-center text-2xl font-medium block">Login</h1>
        <form className="w-full" onSubmit={onSubmit}>
          <input
            type="text"
            className="w-full h-11 p-4 mt-5 text-lg border-2 border-gray-800"
            name="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
          />
          <input
            type="password"
            className="w-full h-11 p-4 mt-5 text-lg border-2 border-gray-800"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
          />
          <button className="w-full p-2 mt-7 text-lg border-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-800  text-slate-100">
            Submit
          </button>
          <p className="w-full text-center mt-3">
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
    </div>
  );
}

export default Login;
