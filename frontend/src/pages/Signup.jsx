import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <section className="flex min-h-[calc(100vh-72px)] items-center justify-center px-6">

      <div className="w-full max-w-md">

        <div className="mb-8">
          <p className="text-sm uppercase tracking-widest text-green-500">
            beforeSHOW
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Create your account.
          </h1>
        </div>

        <form className="space-y-5">

          <input
            type="text"
            placeholder="Username"
            className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 outline-none focus:border-green-500"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 outline-none focus:border-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 outline-none focus:border-green-500"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-green-500 py-3 font-semibold text-black hover:bg-green-400"
          >
            Create account
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