import React, { useState } from "react";
import UndrawMovieNight from "../assets/undraw_movie-night_pkvp.svg";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Landing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchTerm)}`);
    }
  };

   const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/movies?search=${searchTerm}`);
    }
  };

  return (
    <section id="landing">
      <header>
        <div className="header__container">
          <div className="header__description">
            <h1>USA's most awarded online movie platform</h1>
            <h2>
              Search inside of the library with the{" "}
              <span className="purple"> search bar!</span>
            </h2>
          </div>
          <div className="search__bar">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
              className="search__bar--input"
              placeholder="Search Movies..."
            />
            <button
              type="submit"
              onClick={handleSearch}
              className="search__bar--btn"
            >
              Search
            </button>
          </div>
          
          {loading && <Loader />}
          {error && <span className="red">{error}</span>}
          {movie && movie.length > 0 && (
            <div className="movies__list">{/* movie cards here */}</div>
          )}
          <figure className="movie__landing--wrapper">
            <img src={UndrawMovieNight} alt="" />
          </figure>
        </div>
      </header>
    </section>
  );
};

export default Landing;
