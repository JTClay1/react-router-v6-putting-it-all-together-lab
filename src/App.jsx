// Main routing file for the Movie Directory app
// Sets up all our routes and nested routes using React Router v6

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import DirectorContainer from "./pages/DirectorContainer";
import DirectorList from "./pages/DirectorList";
import DirectorForm from "./pages/DirectorForm";
import DirectorCard from "./pages/DirectorCard";
import MovieForm from "./pages/MovieForm";
import MovieCard from "./pages/MovieCard";

export default function App() {
  return (
    // BrowserRouter wraps the whole app so routing works across all components
    <BrowserRouter>
      {/* Navigation bar appears on every page */}
      <NavBar />

      {/* All of our route definitions */}
      <Routes>
        {/* Basic top-level routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Parent route for all director-related content */}
        <Route path="/directors" element={<DirectorContainer />}>
          {/* Nested routes under /directors */}
          <Route index element={<DirectorList />} />
          <Route path="new" element={<DirectorForm />} />

          {/* Nested routes under /directors/:id */}
          <Route path=":id" element={<DirectorCard />}>
            <Route path="movies/new" element={<MovieForm />} />
            <Route path="movies/:movieId" element={<MovieCard />} />
          </Route>
        </Route>

        {/* Redirect any invalid path back to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
