import { useState } from "react";

import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import movies from "../data/movies";

const Movies = () => {
  const [search, setSearch] = useState("");

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-10">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-green-500">
          beforeSHOW
        </p>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Movies
        </h1>

        <p className="mt-3 max-w-xl text-gray-400">
          Find something worth watching.
        </p>
      </div>

      <div className="mb-8 max-w-md">
        <SearchBar
          value={search}
          onChange={setSearch}
        />
      </div>

      {filteredMovies.length > 0 ? (
        <MovieGrid movies={filteredMovies} />
      ) : (
        <div className="py-20 text-center text-gray-500">
          No movies found.
        </div>
      )}

    </section>
  );
};

export default Movies;