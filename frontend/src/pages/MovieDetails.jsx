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
    <section className="flex w-full gap-8 px-5 py-2 md:px-16 lg:px-24">

      {/* LEFT SIDE */}

      <div className="w-60 shrink-0">

        <img
          src={movie.poster}
          alt={movie.name}
          className="h-100 w-60 rounded-2xl object-cover shadow-2xl"
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

      {/* RIGHT SIDE */}

      <div className="flex min-w-0 flex-1 flex-col">

        <h2 className="mb-5 text-2xl font-bold text-green-500">
          Reviews
        </h2>

        {/* REVIEWS */}

        <div className="grid max-h-100 grid-cols-4 gap-5 overflow-y-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          {movie.comments?.length > 0 ? (
            movie.comments.map((comment, index) => (
              <div
                key={comment._id || index}
                className="h-40 rounded-2xl border border-gray-800 bg-gray-900 p-5"
              >

                <div className="flex items-center justify-between gap-2">

                  <p className="truncate font-semibold">
                    {comment.userName}
                  </p>

                  <p className="shrink-0 text-green-500">
                    ★ {comment.rating}
                  </p>

                </div>

                <p className="mt-4 max-h-20 overflow-y-auto text-gray-400 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {comment.comment}
                </p>

              </div>
            ))
          ) : (
            <p className="col-span-4 text-gray-600">
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