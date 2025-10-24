// Child component rendered under /directors
// Displays the list of all directors pulled from the parent context

import { Link, useOutletContext } from "react-router-dom";

const DirectorList = () => {
  // Access the directors array that DirectorContainer provides
  const { directors } = useOutletContext();

  if (!directors) return <p>Loading directors...</p>;
  if (directors.length === 0) return <p>No directors yet.</p>;

  return (
    <div>
      <p>
        {/* Link to add a new director */}
        <Link to="/directors/new">Add New Director</Link>
      </p>

      {/* Map through each director and render a link to their page */}
      <ul>
        {directors.map((d) => (
          <li key={d.id}>
            <Link to={`/directors/${d.id}`}>{d.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DirectorList;
