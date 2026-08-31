import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getMovieById } from "../services/api";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);

        setMovie(data.movie || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-gray-500">
        Loading movie...
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">
          Movie not found
        </h1>

        <Link
          to="/movies"
          className="mt-5 text-green-500 hover:underline"
        >
          Back to movies
        </Link>
      </div>
    );
  }

  return (
    <section className="w-full px-8 py-12 md:px-16 lg:px-24">

      <div className="grid gap-12 md:grid-cols-[300px_1fr]">

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
            {new Date(movie.date).getFullYear()}
          </p>

          <div className="mt-8 flex items-center gap-5">

            <div>
              <p className="text-3xl font-bold text-green-500">
                {movie.averageRating || "—"}
              </p>

              <p className="text-sm text-gray-500">
                Rating
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">
                {movie.totalReviews || 0}
              </p>

              <p className="text-sm text-gray-500">
                Reviews
              </p>
            </div>

          </div>

        </div>

      </div>

      {movie.comments?.length > 0 && (
        <div className="mt-16">

          <h2 className="mb-6 text-2xl font-bold">
            Reviews
          </h2>

          <div className="grid gap-4 md:grid-cols-2">

            {movie.comments.map((comment) => (
              <div
                key={comment._id}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-5"
              >
                <div className="flex justify-between">
                  <p className="font-semibold">
                    {comment.userName}
                  </p>

                  <p className="text-green-500">
                    ★ {comment.rating}
                  </p>
                </div>

                <p className="mt-3 text-gray-400">
                  {comment.comment}
                </p>
              </div>
            ))}

          </div>

        </div>
      )}

    </section>
  );
};

export default MovieDetails;