import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Ratings from "./pages/Ratings";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-gray-950 text-white">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/movies" element={<Movies />} />

            <Route path="/movies/:id" element={<MovieDetails />} />

            <Route path="/series" element={<Series />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/ratings" element={<Ratings />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
