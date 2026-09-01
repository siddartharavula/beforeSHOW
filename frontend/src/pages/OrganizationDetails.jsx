import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MovieGrid from "../components/MovieGrid";
import { getMoviesByOrganization } from "../services/api";

const OrganizationDetails = () => {
  const { id } = useParams();

  const [organization, setOrganization] = useState(null);
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrganizationMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMoviesByOrganization(id);

        setOrganization(data.organization);
        setMovies(data.movies || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizationMovies();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-gray-500">
        Loading organization...
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
    <section className="w-full">

      {/* ORGANIZATION HEADER */}

      <div className="sticky top-18 z-40 border-b border-gray-800 bg-gray-950/95 backdrop-blur">

        <div className="flex h-24 items-center gap-5 px-8 md:px-16 lg:px-24">

          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-900">
            <img
              src={organization.logo}
              alt={organization.name}
              className="h-full w-full object-contain p-2"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              {organization.name}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {organization.city}, {organization.state}
            </p>
          </div>

        </div>

      </div>


      {/* MOVIES */}

      <div className="px-8 py-6 md:px-16 lg:px-24">

        <div className="mb-5">

          <p className="text-sm text-gray-500">
            Explore the collection
          </p>

          <h2 className="text-3xl font-bold">
            Movies
          </h2>

        </div>

        {movies.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            No movies found for this organization.
          </div>
        ) : (
          <MovieGrid movies={movies} />
        )}

      </div>

    </section>
  );
};

export default OrganizationDetails;