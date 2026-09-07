import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getMovieById, createComment } from "../services/api";
import CommentBox from "../components/commentBox";
import { useAuth } from "../context/authContext.jsx";

const MovieDetails = () => {
  const { id } = useParams();

  const { accessToken, user } = useAuth();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);

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

  const handleComment = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      setCommentError("Please login to comment.");
      return;
    }

    if (!rating) {
      setCommentError("Please give a rating.");
      return;
    }

    if (Number(rating) < 1 || Number(rating) > 10) {
      setCommentError("Rating must be between 1 and 10.");
      return;
    }

    if (!comment.trim()) {
      setCommentError("Please write a comment.");
      return;
    }

    try {
      setCommentLoading(true);
      setCommentError("");

      await createComment(
        id,
        {
          rating: Number(rating),
          comment: comment.trim(),
        },
        accessToken
      );

      setComment("");
      setRating("");

      const data = await getMovieById(id);

      setMovie({
        ...data.movie,
        averageRating: data.averageRating,
        totalReviews: data.totalReviews,
        comments: data.comments,
      });
    } catch (err) {
      setCommentError(err.message);
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-gray-500">
        Loading movie...
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
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
    <section className="flex w-full min-w-0 flex-col gap-8 overflow-hidden px-5 py-5 md:flex-row md:px-16 md:py-2 lg:px-24">

      {/* LEFT SIDE */}

      <div className="w-full shrink-0 md:w-60">

        {/* MOVIE INFO */}

        <div className="flex items-center gap-4 md:block">

          {/* POSTER */}

          <img
            src={movie.poster}
            alt={movie.name}
            className="h-52 w-36 shrink-0 rounded-xl object-cover shadow-2xl md:h-100 md:w-60 md:rounded-2xl"
          />

          {/* DETAILS */}

          <div className="flex min-w-0 flex-1 flex-col justify-start text-left md:w-full">

            <h1 className="mt-0 mb-1 break-words text-xl font-bold md:mt-3 md:text-3xl">
              {movie.name}
            </h1>

            <p className="text-xs font-medium uppercase tracking-widest text-green-500 md:text-sm">
              {movie.genre}{" "}
              <span className="ml-2 text-white md:ml-5">
                {new Date(movie.date).getFullYear()}
              </span>
            </p>

            <div className="mt-4 flex items-center gap-4 md:mt-5 md:gap-5">

              <div>
                <p className="text-xl font-bold text-green-500 md:text-2xl">
                  {movie.averageRating || "*"}
                </p>

                <p className="text-xs text-gray-500 md:text-sm">
                  Rating
                </p>
              </div>

              <div>
                <p className="text-xl font-bold md:text-2xl">
                  {movie.totalReviews || 0}
                </p>

                <p className="text-xs text-gray-500 md:text-sm">
                  Reviews
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex w-full min-w-0 flex-1 flex-col md:w-auto">

        <h2 className="mb-5 text-2xl font-bold text-green-500">
          Reviews
        </h2>

        {/* REVIEWS */}

        <div className="flex max-h-[70vh] min-w-0 flex-col gap-5 overflow-y-auto pb-3 scrollbar-none [&::-webkit-scrollbar]:hidden">

          {movie.comments?.length > 0 ? (
            movie.comments.map((comment, index) => (
              <div
                key={comment._id || index}
                className="w-full min-w-0 rounded-2xl border border-gray-800 bg-gray-900 p-4 md:p-5"
              >

                <div className="flex min-w-0 items-center justify-between gap-2">

                  <p className="min-w-0 truncate font-semibold">
                    {comment.userName}
                  </p>

                  <p className="shrink-0 text-green-500">
                    ★ {comment.rating}
                  </p>

                </div>

                <p className="mt-2 wrap-break-words text-gray-400">
                  {comment.comment}
                </p>

              </div>
            ))
          ) : (
            <p className="text-gray-600">
              No reviews yet.
            </p>
          )}

        </div>

        {/* COMMENT SECTION */}

        {user ? (
          <div className="mt-auto">

            {commentError && (
              <p className="mt-4 text-sm text-red-400">
                {commentError}
              </p>
            )}

            <CommentBox
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              onSubmit={handleComment}
              loading={commentLoading}
            />

          </div>
        ) : (
          <div className="mt-auto rounded-2xl border border-gray-800 bg-gray-900 p-5 text-center">

            <p className="text-gray-400">
              Login to rate and comment on this movie.
            </p>

            <Link
              to="/login"
              className="mt-3 inline-block text-green-500 hover:underline"
            >
              Log in
            </Link>

          </div>
        )}

      </div>

    </section>
  );
};

export default MovieDetails;