import MovieCard from "./MovieCard";

const MovieGrid = ({ movies }) => {
  return (
    <div className="grid grid-cols-3 gap-x-2 gap-y-6 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-10 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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