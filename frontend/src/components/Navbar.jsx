import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import SearchBar from "./SearchBar"

const Navbar = () => {
  const navigate = useNavigate();

  

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 backdrop-blur">
      <div className="flex h-12 w-full items-center px-6">

        <Link to="/" className="shrink-0">
          <img
            src={logo}
            alt="beforeSHOW"
            className="h-10 w-auto p-3"
          />
        </Link>

        <div className="ml-25 flex items-center gap-20">
          <Link
            to="/movies"
            className="text-sm font-extralight text-gray-300 transition hover:text-green-500"
          >
            MOVIES
          </Link>

          <Link
            to="/series"
            className="text-sm font-extralight text-gray-300 transition hover:text-green-500"
          >
            SERIES
          </Link>
        </div>

        

        <div className="ml-auto flex items-center gap-5">
          <button
            onClick={() => navigate("/login")}
            className="rounded-full border border-gray-500 px-5 py-1 text-sm transition hover:border-green-500 hover:text-green-500"
          >
            Log in
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;