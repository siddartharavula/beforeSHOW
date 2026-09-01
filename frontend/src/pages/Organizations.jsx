import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOrganizations } from "../services/api";

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getOrganizations();

        setOrganizations(data.organizations || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-gray-500">
        Loading organizations...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <section className="w-full px-6 py-12 md:px-16 lg:px-24">

      <h1 className="text-4xl font-bold">
        Organizations
      </h1>

      <p className="mt-2 text-gray-500">
        Explore movies from your organizations.
      </p>

      {organizations.length === 0 ? (
        <p className="mt-16 text-gray-500">
          No organizations available.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

          {organizations.map((organization) => (
            <Link
              key={organization._id}
              to={`/organizations/${organization._id}`}
              className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 transition hover:-translate-y-1 hover:border-green-500"
            >

              <div className="aspect-square w-full bg-gray-950">
                <img
                  src={organization.logo}
                  alt={organization.name}
                  className="h-full w-full object-contain p-5"
                />
              </div>

              <div className="p-4">

                <h2 className="truncate font-semibold">
                  {organization.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {organization.city}, {organization.state}
                </p>

              </div>

            </Link>
          ))}

        </div>
      )}

    </section>
  );
};

export default Organizations;