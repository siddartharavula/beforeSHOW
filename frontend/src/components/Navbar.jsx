import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import { useAuth } from "../context/authContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 backdrop-blur">
      <div className="flex h-18 w-full items-center px-6">

        {/* LOGO */}

        <Link to="/" className="shrink-0">
          <img
            src={logo}
            alt="beforeSHOW"
            className="h-10 w-auto p-1.5"
          />
        </Link>


        {/* LEFT LINKS */}

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

          <Link
            to="/organizations"
            className="text-sm font-medium text-gray-300 transition hover:text-green-500"
          >
            ORGANIZATIONS
          </Link>

        </div>


        {/* RIGHT */}

        <div className="relative ml-auto flex items-center gap-4">

          {/* CREATE */}

          <button
            onClick={() => navigate("/admin/create")}
            className="rounded-full border border-gray-700 px-5 py-2 text-sm transition hover:border-green-500 hover:text-green-500"
          >
            Create
          </button>


          {/* LOGIN / USER */}

          {!user ? (

            <button
              onClick={() => navigate("/login")}
              className="rounded-full border border-gray-700 px-5 py-2 text-sm transition hover:border-green-500 hover:text-green-500"
            >
              Log in
            </button>

          ) : (

            <>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition hover:bg-gray-900"
              >

                <span>
                  {user.fullName?.firstName || user.userName}
                </span>

                <span className="text-gray-500">
                  ▾
                </span>

              </button>


              {open && (

                <div className="absolute right-0 top-12 mt-3 w-48 overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-xl">

                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="block px-5 py-3 text-sm hover:bg-gray-800"
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/ratings"
                    onClick={() => setOpen(false)}
                    className="block px-5 py-3 text-sm hover:bg-gray-800"
                  >
                    My Ratings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full px-5 py-3 text-left text-sm text-red-400 hover:bg-gray-800"
                  >
                    Log out
                  </button>

                </div>

              )}

            </>

          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;