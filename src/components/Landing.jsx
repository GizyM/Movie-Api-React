import React, { useEffect, useState } from "react";
import UndrawMovieNight from "../assets/undraw_movie-night_pkvp.svg";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Landing = ({  }) => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchId, setSearchId] = useState(id);
    const [searchTerm, setSearchTerm] = useState([]);

    function onSearch() {
        fetchMovies(searchId);
    }

    async function fetchMovies(searchTerm) {
        setLoading(true)
        const { data } = await axios.get(`https://omdbapi.com/?s=${searchTerm}&apikey=826b9a2e`
        );
        setMovies(data);
        setLoading(false);
    }

    function onSearchKeyPress(key) {
        if (key === 'Enter') {
            onSearch()
        }
    }

    useEffect(() => {
        fetchMovies();
    }, []);

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
              className="search__bar--input"
              placeholder="Search Movies..."
            />
            <button type="submit" onClick={() => onSearch()} className="search__bar--btn"
                onKeyPress={(event) => onSearchKeyPress(event.key)}>
              Search
            </button>
          </div>
          <figure className="movie__landing--wrapper">
            <img src={UndrawMovieNight} alt="" />
          </figure>
        </div>
      </header>
    </section>
  );
};

export default Landing;
