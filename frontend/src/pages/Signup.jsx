import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signupUser } from "../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const userData = {
        userName: form.userName,
        fullName: {
          firstName: form.firstName,
          lastName: form.lastName,
        },
        email: form.email,
        password: form.password,
      };

      await signupUser(userData);

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex w-full items-center justify-center px-5 py-8 sm:px-6 md:py-10">

      <div className="h-auto w-full max-w-lg">

        <p className="text-sm tracking-[0.2em] text-green-500">
          <span className="text-white">before</span>SHOW
        </p>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          Create your account.
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Join beforeSHOW and start exploring.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">

          {/* NAME */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full min-w-0 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none focus:border-green-500"
            />

            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Family Name"
              className="w-full min-w-0 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none focus:border-green-500"
            />

          </div>

          {/* USERNAME */}

          <input
            name="userName"
            value={form.userName}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full min-w-0 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none focus:border-green-500"
          />

          {/* EMAIL */}

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full min-w-0 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none focus:border-green-500"
          />

          {/* PASSWORD */}

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full min-w-0 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none focus:border-green-500"
          />

          {/* ERROR */}

          {error && (
            <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-500 py-3 font-semibold text-black transition hover:bg-green-400 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create account"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-500 hover:underline"
          >
            Log in
          </Link>
        </p>

      </div>

    </section>
  );
};

export default Signup;