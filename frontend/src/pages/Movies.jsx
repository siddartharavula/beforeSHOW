import { useEffect, useState } from "react";

import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import { getMovies } from "../services/api";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMovies(search);
        console.log(data); 

        setMovies(data.movies || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [search]);

  return (
    <div className="w-full">

      <section className="border-b border-gray-800 bg-linear-to-b from-gray-900 to-gray-950">
        <div className="px-8 py-2 md:px-16 lg:px-24">

          <p className=" text-sm font-semibold tracking-[0.3em] text-green-500">
            <span className="text-white">before</span>SHOW
          </p>

          <h1 className="flex max-w-4xl flex-wrap gap-x-3 font-bold leading-tight tracking-tight md:text-5xl">
            Find your next
            <span className="text-green-500">
              obsession
            </span>
          </h1>

          <p className=" max-w-xl text-md leading-relaxed text-gray-300">
            Explore movies, discover something new, and decide what deserves
            your <span className="text-green-500">TIME</span>
          </p>

        </div>
      </section>

      <section className="px-8 py-2 md:px-16 lg:px-24 ">

        <div className="mb-2 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>
            <p className=" text-sm text-gray-500">
              Explore the collection
            </p>

            <h2 className="text-3xl font-bold">
              Movies
            </h2>
          </div>

          <div className="w-full md:w-60">
            <SearchBar
              value={search}
              onChange={setSearch}
            />
          </div>

        </div>

        {loading && (
          <div className="py-20 text-center text-gray-500">
            Loading movies...
          </div>
        )}

        {!loading && error && (
          <div className="py-20 text-center text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            No movies found.
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <MovieGrid movies={movies} />
        )}

      </section>

    </div>
  );
};

export default Movies;