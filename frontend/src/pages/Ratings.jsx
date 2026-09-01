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
      <div className="flex min-h-[70vh] items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <section className="w-full p-10">

      {/* PAGE TITLE */}

      <h1 className="text-4xl font-bold">
        My Ratings
      </h1>

      <p className="mt-2 text-gray-500">
        Movies you've reviewed.
      </p>

      {/* NO RATINGS */}

      {ratings.length === 0 ? (
        <p className="mt-16 text-gray-500">
          You haven't rated any movies yet.
        </p>
      ) : (

        /* RATINGS GRID */

        <div className="mt-5 grid grid-cols-3 gap-5 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">

          {ratings.map((rating) => (

            /* CARD */

            <div
              key={rating._id}
              className="flex h-75 w-full overflow-hidden rounded-2xl border border-gray-800 bg-gray-900"
            >

              {/* LEFT SIDE - 1/3 */}

              <div className="flex w-2/5 shrink-0 flex-col">

                {/* POSTER - 75% */}

                <img
                  src={rating.movie?.poster}
                  alt={rating.movie?.name}
                  className="h-8/10 w-full object-cover p-1 rounded-2xl"
                />

                {/* MOVIE NAME + RATING - 25% */}

                <div className="flex h-1/4 flex-col justify-center px-4">

                  <h2 className="line-clamp-2 text-sm font-semibold">
                    {rating.movie?.name}
                  </h2>

                  <p className="mt-1 text-xs text-green-500">
                    ★ {rating.rating}/10
                  </p>

                </div>

              </div>

              {/* RIGHT SIDE - 2/3 */}

              <div className="w-3/5 overflow-y-auto px-2 py-5 scrollbar-none [&::-webkit-scrollbar]:hidden">

                <p className="text-sm leading-6 text-gray-400">
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