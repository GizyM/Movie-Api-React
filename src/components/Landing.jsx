import React, { useState } from "react";
import UndrawMovieNight from "../assets/undraw_movie-night_pkvp.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const Landing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const searchMovie = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://omdbapi.com/?s=${searchTerm}&apikey=826b9a2e`
      );
      if (response.data.Response === "True") {
        setMovie(response.data.Search);
      } else {
        setError(response.data.Error);
        setMovie([]);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.", err);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMovie();
    }
  };

  const viewDetails = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <section id="landing">
      <header>
        <div className="header__container">
          <div className="header__description">
            <h1>USA's most awarded online movie platform</h1>
            <h2>
              Search inside of the library with the
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
              onClick={searchMovie}
              className="search__bar--btn"
            >
              Search
            </button>
          </div>
          {movie && movie.length > 0 && (
            <div className="movies__list">
              {movie.map((item) => (
                <div
                  key={item.imdbID}
                  className="movie"
                  onClick={() => viewDetails(item.imdbID)}
                >
                  <img
                    src={
                      item.Poster !== "N/A" ? item.Poster : "placeholder.jpg"
                    }
                    alt={item.Title}
                    className="movie__poster"
                  />
                  <h3>{item.Title}</h3>
                  <p>{item.Year}</p>
                </div>
              ))}
            </div>
          )}
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
