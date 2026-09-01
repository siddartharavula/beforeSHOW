import { useEffect, useState } from "react";

import {
  createMovie,
  getOrganizations,
} from "../services/api";

import { useAuth } from "../context/authContext.jsx";

const CreateMovie = () => {
  const { user, accessToken } = useAuth();

  const [organizations, setOrganizations] = useState([]);

  const [form, setForm] = useState({
    name: "",
    genre: "",
    date: "",
    poster: "",
    organization: "",
  });

  const [loading, setLoading] = useState(false);
  const [organizationLoading, setOrganizationLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getOrganizations();

        setOrganizations(data.organizations || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setOrganizationLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (!user || user.role !== "admin") {
    return (
      <section className="flex min-h-[70vh] items-center justify-center">
        <h1 className="text-3xl font-bold text-red-400">
          Admins only
        </h1>
      </section>
    );
  }

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
      setSuccess("");

      await createMovie(form, accessToken);

      setSuccess("Movie created successfully.");

      setForm({
        name: "",
        genre: "",
        date: "",
        poster: "",
        organization: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex w-full justify-center px-6 py-12 md:px-16 lg:px-24">

      <div className="w-full max-w-md">

        <p className="text-sm tracking-[0.3em] text-green-500">
          beforeSHOW
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Create Movie
        </h1>

        <p className="mt-2 text-gray-500">
          Add a movie to beforeSHOW.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* MOVIE NAME */}

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Movie Name
            </label>

            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Movie name"
              required
              className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none focus:border-green-500"
            />
          </div>


          {/* GENRE */}

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Genre
            </label>

            <input
              name="genre"
              type="text"
              value={form.genre}
              onChange={handleChange}
              placeholder="Action, Drama, Sci-Fi..."
              required
              className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none focus:border-green-500"
            />
          </div>


          {/* DATE */}

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Release Date
            </label>

            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none focus:border-green-500"
            />
          </div>


          {/* POSTER URL */}

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Poster URL
            </label>

            <input
              name="poster"
              type="url"
              value={form.poster}
              onChange={handleChange}
              placeholder="https://example.com/poster.jpg"
              required
              className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none focus:border-green-500"
            />
          </div>


          {/* ORGANIZATION */}

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Organization
            </label>

            <select
              name="organization"
              value={form.organization}
              onChange={handleChange}
              disabled={organizationLoading}
              className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none focus:border-green-500"
            >

              <option value="">
                General Movie
              </option>

              {organizations.map((organization) => (
                <option
                  key={organization._id}
                  value={organization._id}
                >
                  {organization.name}
                </option>
              ))}

            </select>
          </div>


          {/* ERROR */}

          {error && (
            <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}


          {/* SUCCESS */}

          {success && (
            <p className="rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-400">
              {success}
            </p>
          )}


          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-500 py-3 font-semibold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Movie"}
          </button>

        </form>

      </div>

    </section>
  );
};

export default CreateMovie;