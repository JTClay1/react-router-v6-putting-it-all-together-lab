// Parent component that fetches all directors and provides them to child routes

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const DirectorContainer = () => {
  // Keeps track of the list of all directors
  const [directors, setDirectors] = useState(null);

  // Fetch directors from our mock API (the tests mock "/directors")
  useEffect(() => {
    fetch("/directors")
      .then((r) => r.json())
      .then(setDirectors)
      .catch(() => setDirectors([]));
  }, []);

  return (
    <main>
      <h1>Welcome to the Director's Directory!</h1>

      {/* Outlet allows nested routes (like DirectorList or DirectorCard) 
          to render inside this parent component */}
      <Outlet context={{ directors, setDirectors }} />
    </main>
  );
};

export default DirectorContainer;
