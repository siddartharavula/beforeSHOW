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

      console.log("MOVIE DETAILS:", data);

      setMovie({
        ...data.movie,
        averageRating: data.averageRating,
        totalReviews: data.totalReviews,
        comments: data.comments,
      });
    } catch (err) {
      console.log("ERROR:", err);
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
    <section className="w-full px-5 py-2 md:px-16 lg:px-24 flex gap-8">

      <div className="gap-2 md:grid-cols-[300px_1fr] ">

        <img
          src={movie.poster}
          alt={movie.name}
          className="w-60 h-100 rounded-2xl object-cover shadow-2xl"
        />

        <div className="flex flex-col justify-start">

          <h1 className="mt-3 mb-1 text-3xl font-bold">
            {movie.name}
          </h1>

          <p className="text-sm font-medium uppercase tracking-widest text-green-500">
            {movie.genre}{" "}
            <span className="ml-5 text-white">
              {new Date(movie.date).getFullYear()}
            </span>
          </p>

          <div className="mt-5 flex items-center gap-5">

            <div>
              <p className="text-2xl font-bold text-green-500">
                {movie.averageRating || "*"}
              </p>

              <p className="text-sm text-gray-500">
                Rating
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold">
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
        <div className="p-2">

          <h2 className="mb-5 text-2xl font-bold text-green-500">
            Reviews
          </h2>

          <div className="grid w-70 gap-5">

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