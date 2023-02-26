import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="w-full py-5 px-9 flex justify-center items-center shadow-md sticky top-0 left-0 right-0 bg-slate-50">
      <div className="flex-1">
        <Link to="/" className="font-semibold  text-3xl">
          Daily Blog
        </Link>
      </div>
      <nav className="flex-1 flex justify-around">
        <Link
          to="/"
          className="font-normal md:text-xl text-lg sm:block hidden hover:underline"
        >
          Home
        </Link>
        {!user ? (
          <Link
            to="/login"
            className="font-normal md:text-xl text-lg sm:block hidden hover:underline"
          >
            Login
          </Link>
        ) : (
          <Link
            className="font-normal md:text-xl text-lg sm:block hidden hover:underline"
            onClick={onLogout}
          >
            Logout
          </Link>
        )}
        <Link
          to="/register"
          className="font-normal md:text-xl text-lg sm:block hidden hover:underline"
        >
          Register
        </Link>
        <div className="sm:hidden absolute w-7 h-7 p-1 text-xl right-9 top-7 cursor-pointer bg-inherit active:bg-gray-200 ">
          <RxHamburgerMenu />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
