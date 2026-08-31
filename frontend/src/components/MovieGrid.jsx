import MovieCard from "./MovieCard";

const MovieGrid = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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