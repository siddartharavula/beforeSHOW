import { Link, useParams } from "react-router-dom";
import movies from "../data/movies";

const MovieDetails = () => {
  const { id } = useParams();

  const movie = movies.find(
    (movie) => movie._id === id
  );

  if (!movie) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-3xl font-bold">
          Movie not found
        </h1>

        <Link
          to="/movies"
          className="mt-6 inline-block text-green-500 hover:underline"
        >
          Back to movies
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">

      <div className="grid gap-10 md:grid-cols-[300px_1fr]">

        <img
          src={movie.poster}
          alt={movie.name}
          className="w-full rounded-2xl object-cover shadow-2xl"
        />

        <div className="flex flex-col justify-center">

          <p className="text-sm font-medium uppercase tracking-widest text-green-500">
            {movie.genre}
          </p>

          <h1 className="mt-3 text-5xl font-bold">
            {movie.name}
          </h1>

          <p className="mt-4 text-gray-400">
            Released{" "}
            {new Date(movie.date).getFullYear()}
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-full bg-green-500 px-6 py-3 font-semibold text-black transition hover:bg-green-400">
              Rate Movie
            </button>

            <button className="rounded-full border border-gray-700 px-6 py-3 transition hover:border-gray-500">
              Add Review
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};

export default MovieDetails;