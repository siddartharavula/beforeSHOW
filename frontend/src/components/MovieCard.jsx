import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movies/${movie._id}`}
      className="group block min-w-0"
    >
      <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-gray-900 sm:rounded-2xl">

        <img
          src={movie.poster}
          alt={movie.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 transition duration-300 group-hover:opacity-100 sm:p-4">
          <span className="text-[10px] font-medium uppercase tracking-wider text-green-400 sm:text-xs">
            View details
          </span>
        </div>

      </div>

      <div className="mt-2 min-w-0 sm:mt-4">

        <h3 className="truncate text-sm font-semibold text-white sm:text-lg">
          {movie.name}
        </h3>

        <div className="mt-1 flex min-w-0 items-center gap-1 text-[10px] text-gray-500 sm:gap-2 sm:text-sm">

          <span className="truncate">{movie.genre}</span>

          <span>•</span>

          <span className="shrink-0 text-green-500">
            ★ {movie.rating > 0 ? movie.rating : "No rating"}
          </span>

        </div>

      </div>
    </Link>
  );
};

export default MovieCard;