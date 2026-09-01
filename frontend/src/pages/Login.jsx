import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/api";
import { useAuth } from "../context/authContext.jsx";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    loginId: "",
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

      const data = await loginUser(form);

      login(data);

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex h-120 items-center justify-center px-6">
      <div className="w-full max-w-md">

        <p className="text-sm tracking-[0.3em] text-green-500">
          beforeSHOW
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Welcome back.
        </h1>

        <p className="mt-2 text-gray-500">
          Sign in to continue.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <input
            name="loginId"
            type="text"
            value={form.loginId}
            onChange={handleChange}
            placeholder="Username or Email"
            required
            className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none transition focus:border-green-500"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none transition focus:border-green-500"
          />

          {error && (
            <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-500 py-3 font-semibold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-green-500 hover:underline"
          >
            Sign up
          </Link>
        </p>

      </div>
    </section>
  );
};

export default Login;