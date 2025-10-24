// Simple homepage with links to other routes

import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <>
      {/* NavBar is included globally, but having it here doesn’t break anything */}
      {/* <NavBar /> */}

      <main>
        <h1>Welcome to the Movie Directory</h1>
        <p>Explore a collection of famous directors and their iconic movies.</p>
        <nav>
          {/* Navigation links to other pages */}
          <Link to="/directors">View Directors</Link> |{" "}
          <Link to="/about">Learn More About This App</Link>
        </nav>
      </main>
    </>
  );
}

export default Home;
