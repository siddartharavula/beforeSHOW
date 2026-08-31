import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movies/${movie._id}`}
      className="group block"
    >
      <div className="relative aspect-2/3 overflow-hidden rounded-2xl bg-gray-900">

        <img
          src={movie.poster}
          alt={movie.name}
          className="h-full w-full object-cover tansition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="text-xs font-medium uppercase tracking-wider text-green-400">
            View details
          </span>
        </div>

      </div>

      <div className="mt-4">
        <h3 className="truncate text-lg font-semibold text-white">
          {movie.name}
        </h3>

        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
          <span>{movie.genre}</span>
          <span>•</span>
          <span>
            {new Date(movie.date).getFullYear()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;