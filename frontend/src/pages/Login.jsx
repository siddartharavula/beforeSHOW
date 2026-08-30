import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="flex min-h-[calc(100vh-72px)] items-center justify-center px-6">

      <div className="w-full max-w-md">

        <div className="mb-8">
          <p className="text-sm uppercase tracking-widest text-green-500">
            beforeSHOW
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Welcome back.
          </h1>

          <p className="mt-2 text-gray-500">
            Sign in to continue.
          </p>
        </div>

        <form className="space-y-5">

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Email
            </label>

            <input
              type="email"
              className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 outline-none focus:border-green-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Password
            </label>

            <input
              type="password"
              className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 outline-none focus:border-green-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-green-500 py-3 font-semibold text-black transition hover:bg-green-400"
          >
            Log in
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