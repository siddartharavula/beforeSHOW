import { useAuth } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

const AdminCreate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== "admin") {
    return (
      <section className="flex min-h-[70vh] items-center justify-center">
        <h1 className="text-3xl font-bold text-red-400">
          Admins only
        </h1>
      </section>
    );
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6">

      <div className="w-full max-w-md">

        <p className="text-sm tracking-[0.3em] text-green-500">
          beforeSHOW
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Create
        </h1>

        <p className="mt-2 text-gray-500">
          What do you want to create?
        </p>

        <div className="mt-8 grid gap-4">

          <button
            onClick={() => navigate("/admin/create/movie")}
            className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-left transition hover:border-green-500"
          >
            <h2 className="text-xl font-semibold">
              Movie
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Create a general or organization movie
            </p>
          </button>


          <button
            onClick={() => navigate("/admin/create/organization")}
            className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-left transition hover:border-green-500"
          >
            <h2 className="text-xl font-semibold">
              Organization
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Create a new organization
            </p>
          </button>

        </div>

      </div>

    </section>
  );
};

export default AdminCreate;