import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 backdrop-blur">
      <div className="mx-auto flex h-18 items-center px-6">

        <Link to="/" className="shrink-0">
          <img
            src={logo}
            alt="beforeSHOW"
            className="h-10 w-auto"
          />
        </Link>

        <div className="ml-16 flex items-center gap-8">
          <Link
            to="/movies"
            className="text-sm font-medium text-gray-300 transition hover:text-green-500"
          >
            MOVIES
          </Link>

          <Link
            to="/series"
            className="text-sm font-medium text-gray-300 transition hover:text-green-500"
          >
            SERIES
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-6">

          <div className="hidden items-center rounded-full border border-gray-700 bg-gray-900 px-4 py-2 md:flex">
            <span className="mr-2 text-gray-500">⌕</span>

            <input
              type="text"
              placeholder="Search movies..."
              className="w-48 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
            />
          </div>

          <button
            onClick={() => navigate("/login")}
            className="rounded-full border border-gray-700 px-5 py-2 text-sm transition hover:border-green-500 hover:text-green-500"
          >
            Log in
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;