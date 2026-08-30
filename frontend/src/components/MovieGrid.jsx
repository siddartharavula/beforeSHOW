import MovieCard from "./MovieCard";

const MovieGrid = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
        />
      ))}
    </div>
  );
};

export default MovieGrid;