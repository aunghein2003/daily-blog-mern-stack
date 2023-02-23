import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";

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
    }
    const userData = { email, password };
    dispatch(login(userData));
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
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-full mt-4 flex justify-center items-center">
      <div className="lg:w-1/3 w-1/3 mt-4 flex justify-center items-center flex-col">
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
        </form>
      </div>
    </div>
  );
}

export default Login;
