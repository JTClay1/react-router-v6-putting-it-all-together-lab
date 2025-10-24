// Form for adding a new movie to a director’s list
// Uses outlet context to access the current director and update state

import { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function MovieForm() {
  // Form state
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [genres, setGenres] = useState("");

  // Hooks for routing and shared data
  const { id } = useParams();
  const navigate = useNavigate();
  const { director, setDirectors } = useOutletContext();

  // Handle bad director IDs
  if (!director) return <h2>Director not found</h2>;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build a new movie object from form input
    const newMovie = {
      id: uuidv4(),
      title,
      time: Number(time),
      genres: genres.split(",").map((g) => g.trim()).filter(Boolean),
    };

    // Update director in parent state
    setDirectors((prev) =>
      prev.map((d) =>
        String(d.id) === String(id)
          ? { ...d, movies: [...(d.movies || []), newMovie] }
          : d
      )
    );

    // Optional: send PATCH request to mock server
    fetch(`/directors/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...director,
        movies: [...(director.movies || []), newMovie],
      }),
    }).catch(() => {});

    // After submission, redirect to the new movie’s detail page
    navigate(`/directors/${id}/movies/${newMovie.id}`);
  };

  return (
    <div>
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Genres (comma-separated)"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          required
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default MovieForm;
