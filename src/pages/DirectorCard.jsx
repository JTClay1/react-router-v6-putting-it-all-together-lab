// Displays info for a single director and their movies
// Also nests routes for MovieForm and MovieCard underneath

import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";

function DirectorCard() {
  const { id } = useParams(); // grabs :id from URL
  const { directors, setDirectors } = useOutletContext(); // get data from parent

  if (!directors) return <p>Loading...</p>;

  // Find the specific director using the ID from params
  const director = directors.find((d) => String(d.id) === String(id));

  // Handle invalid IDs gracefully
  if (!director) return <h2>Director not found</h2>;

  return (
    <div>
      <h2>{director.name}</h2>
      <p>{director.bio}</p>

      <h3>Movies:</h3>
      {/* Show list of movies or a fallback if empty */}
      <ul>
        {director.movies?.map((movie) => (
          <li key={movie.id}>
            <Link to={`movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>

      {/* Link to the form for adding a new movie */}
      <Link to="movies/new">Add New Movie</Link>

      {/* Nested movie components will render here */}
      <Outlet context={{ director, setDirectors }} />
    </div>
  );
}

export default DirectorCard;
