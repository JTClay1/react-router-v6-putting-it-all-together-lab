// Form for adding a new director
// Uses programmatic navigation and updates shared director state

import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { v4 as uuid } from "uuid";

function DirectorForm() {
  // Local state for the form inputs
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  // Access state updater + navigation
  const navigate = useNavigate();
  const { setDirectors } = useOutletContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new director object
    const newDirector = { id: uuid(), name, bio, movies: [] };

    // Update parent state right away
    setDirectors((prev) => (prev ? [...prev, newDirector] : [newDirector]));

    // Optional POST request to persist new director
    fetch("/directors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDirector),
    }).catch(() => {});

    // Navigate directly to the new director’s page
    navigate(`/directors/${newDirector.id}`);
  };

  return (
    <div>
      <h2>Add New Director</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Director's Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Director's Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
        <button type="submit">Add Director</button>
      </form>
    </div>
  );
}

export default DirectorForm;
