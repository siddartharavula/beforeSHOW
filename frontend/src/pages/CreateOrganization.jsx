import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createOrganization } from "../services/api";
import { useAuth } from "../context/authContext.jsx";

const CreateOrganization = () => {
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    city: "",
    state: "",
    logo: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

      await createOrganization(form, accessToken);

      setSuccess("Organization created successfully.");

      setForm({
        name: "",
        city: "",
        state: "",
        logo: "",
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
          Create Organization
        </h1>

        <p className="mt-2 text-gray-500">
          Add a new organization.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* NAME */}

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Organization Name
            </label>

            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="College name"
              required
              className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none focus:border-green-500"
            />
          </div>


          {/* CITY */}

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              City
            </label>

            <input
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              required
              className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none focus:border-green-500"
            />
          </div>


          {/* STATE */}

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              State
            </label>

            <input
              name="state"
              type="text"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              required
              className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none focus:border-green-500"
            />
          </div>


          {/* LOGO URL */}

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Logo URL
            </label>

            <input
              name="logo"
              type="url"
              value={form.logo}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
              required
              className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none focus:border-green-500"
            />
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


          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-500 py-3 font-semibold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Organization"}
          </button>

        </form>

      </div>

    </section>
  );
};

export default CreateOrganization;