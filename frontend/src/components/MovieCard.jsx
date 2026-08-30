import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movies/${movie._id}`}
      className="group block overflow-hidden rounded-xl bg-gray-900 transition duration-300 hover:-translate-y-1 hover:bg-gray-800"
    >
      <div className="aspect-2/3 overflow-hidden bg-gray-800">
        <img
          src={movie.poster}
          alt={movie.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h3 className="truncate font-semibold text-white">
          {movie.name}
        </h3>

        <div className="mt-2 flex items-center justify-between text-sm text-gray-400">
          <span>{movie.genre}</span>

          <span>
            {new Date(movie.date).getFullYear()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;