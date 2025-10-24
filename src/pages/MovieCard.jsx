// src/pages/MovieCard.jsx
import { useOutletContext, useParams } from "react-router-dom";

function MovieCard() {
  const { movieId } = useParams();
  const { director } = useOutletContext();

  if (!director) return <h2>Director not found</h2>;
  const movie = director.movies?.find((m) => String(m.id) === String(movieId));
  if (!movie) return <h2>Movie not found</h2>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Duration: {movie.time} minutes</p>
      <p>{movie.genres.join(", ")}</p>
    </div>
  );
}
export default MovieCard;
