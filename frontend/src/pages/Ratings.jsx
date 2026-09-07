import { useEffect, useState } from "react";

import { getMyComments } from "../services/api";
import { useAuth } from "../context/authContext.jsx";

const Ratings = () => {
  const { accessToken } = useAuth();

  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const data = await getMyComments(accessToken);

        setRatings(data.myComments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchRatings();
    } else {
      setLoading(false);
    }
  }, [accessToken]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-gray-500">
        Loading your ratings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-5 text-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <section className="w-full min-w-0 px-5 py-8 sm:px-8 md:px-10">

      {/* PAGE TITLE */}

      <h1 className="text-3xl font-bold sm:text-4xl">
        My Ratings
      </h1>

      <p className="mt-2 text-sm text-gray-500 sm:text-base">
        Movies you've reviewed.
      </p>

      {/* NO RATINGS */}

      {ratings.length === 0 ? (
        <p className="mt-12 text-gray-500 sm:mt-16">
          You haven't rated any movies yet.
        </p>
      ) : (

        /* RATINGS GRID */

        <div className="mt-5 grid min-w-0 grid-cols-1 gap-5 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden sm:grid-cols-2 lg:grid-cols-3">

          {ratings.map((rating) => (

            /* CARD */

            <div
              key={rating._id}
              className="flex h-64 w-full min-w-0 overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 sm:h-72 md:h-75"
            >

              {/* LEFT SIDE */}

              <div className="flex w-2/5 min-w-0 shrink-0 flex-col">

                {/* POSTER */}

                <img
                  src={rating.movie?.poster}
                  alt={rating.movie?.name}
                  className="h-8/10 w-full rounded-2xl object-cover p-1"
                />

                {/* MOVIE NAME + RATING */}

                <div className="flex h-1/4 min-w-0 flex-col justify-center px-3 sm:px-4">

                  <h2 className="line-clamp-2 break-words text-xs font-semibold sm:text-sm">
                    {rating.movie?.name}
                  </h2>

                  <p className="mt-1 text-xs text-green-500">
                    ★ {rating.rating}/10
                  </p>

                </div>

              </div>

              {/* RIGHT SIDE */}

              <div className="min-w-0 flex-1 overflow-y-auto px-3 py-4 scrollbar-none [&::-webkit-scrollbar]:hidden sm:px-4 sm:py-5">

                <p className="break-words text-xs leading-5 text-gray-400 sm:text-sm sm:leading-6">
                  {rating.comment}
                </p>

              </div>

            </div>
          ))}

        </div>
      )}

    </section>
  );
};

export default Ratings;