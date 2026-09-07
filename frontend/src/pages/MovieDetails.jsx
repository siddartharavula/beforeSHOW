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
    <section className="flex w-full min-w-0 flex-col gap-4 overflow-hidden px-3 py-3 sm:gap-5 sm:px-5 sm:py-5 md:flex-row md:gap-8 md:px-16 md:py-2 lg:px-24">

      {/* LEFT SIDE */}

      <div className="w-full shrink-0 md:w-60">

        {/* MOVIE INFO */}

        <div className="flex items-center gap-2 md:block">

          {/* POSTER */}

          <img
            src={movie.poster}
            alt={movie.name}
            className="h-24 w-16 shrink-0 rounded-md object-cover shadow-lg sm:h-32 sm:w-22 sm:rounded-lg md:h-100 md:w-60 md:rounded-2xl md:shadow-2xl"
          />

          {/* DETAILS */}

          <div className="flex min-w-0 flex-1 flex-col justify-start text-left md:w-full">

            <h1 className="mb-1 break-words text-sm font-bold leading-tight sm:text-lg md:mt-3 md:text-3xl">
              {movie.name}
            </h1>

            <p className="text-[9px] font-medium uppercase tracking-wider text-green-500 sm:text-[10px] md:text-sm md:tracking-widest">
              {movie.genre}{" "}
              <span className="ml-1 text-white md:ml-5">
                {new Date(movie.date).getFullYear()}
              </span>
            </p>

            <div className="mt-2 flex items-center gap-3 sm:mt-3 md:mt-5 md:gap-5">

              <div>
                <p className="text-sm font-bold text-green-500 sm:text-lg md:text-2xl">
                  {movie.averageRating || "*"}
                </p>

                <p className="text-[9px] text-gray-500 sm:text-xs md:text-sm">
                  Rating
                </p>
              </div>

              <div>
                <p className="text-sm font-bold sm:text-lg md:text-2xl">
                  {movie.totalReviews || 0}
                </p>

                <p className="text-[9px] text-gray-500 sm:text-xs md:text-sm">
                  Reviews
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col md:w-auto">

        <h2 className="mb-3 text-xl font-bold text-green-500 sm:mb-5 sm:text-2xl">
          Reviews
        </h2>

        {/* REVIEWS */}

        <div className="min-h-0 flex-1 overflow-y-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden md:max-h-[70vh]">

          <div className="flex flex-col gap-3 sm:gap-5">

            {movie.comments?.length > 0 ? (
              movie.comments.map((comment, index) => (
                <div
                  key={comment._id || index}
                  className="w-full min-w-0 rounded-xl border border-gray-800 bg-gray-900 p-3 sm:rounded-2xl sm:p-4 md:p-5"
                >

                  <div className="flex min-w-0 items-center justify-between gap-2">

                    <p className="min-w-0 truncate text-sm font-semibold sm:text-base">
                      {comment.userName}
                    </p>

                    <p className="shrink-0 text-sm text-green-500 sm:text-base">
                      ★ {comment.rating}
                    </p>

                  </div>

                  <p className="mt-1 break-words text-xs leading-5 text-gray-400 sm:mt-2 sm:text-sm sm:leading-6">
                    {comment.comment}
                  </p>

                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">
                No reviews yet.
              </p>
            )}

          </div>

        </div>

        {/* COMMENT SECTION */}

        <div className="shrink-0 pt-2 sm:pt-3">

          {user ? (
            <>
              {commentError && (
                <p className="mb-2 text-xs text-red-400 sm:text-sm">
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
            </>
          ) : (
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-3 text-center sm:rounded-2xl sm:p-5">

              <p className="text-xs text-gray-400 sm:text-sm">
                Login to rate and comment on this movie.
              </p>

              <Link
                to="/login"
                className="mt-2 inline-block text-sm text-green-500 hover:underline"
              >
                Log in
              </Link>

            </div>
          )}

        </div>

      </div>

    </section>
  );
};

export default MovieDetails;