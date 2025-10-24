import React, { useState, useEffect } from "react";
import Movie from "../components/ui/Movie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
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

    if (loading) return <p>Loading...</p>;
    if (error) return <span className="red">{error}</span>;


function filterMovies(filter) {
  console.log("filter");
  if (filter === "newest") {
    setMovies(
      movies
    .sort(
      (a, b) => parseInt(b.Year) - parseInt(a.Year)
    )
  );
  } else if (filter === "oldest") {
    setMovies(
    movies
    .sort((a, b) => parseInt(a.Year) - parseInt(b.Year)
    )
  );
  }
}

const viewDetails = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div id="movies__body">
      <main id="movies__main">
        <section>
          <div className="movies__container">
            <div className="row">
              <div className="movies__header">
                <h2 className="section__title movies__header--title">
                  All Movies
                </h2>
                <select id="movieSort" defaultValue="DEFAULT" onChange={(event) => filterMovies(event.target.value)}>
                    <option value="DEFAULT" disabled>Sort by year</option>
                    <option value="newest">Newest to Oldest</option>
                    <option value="oldest">Oldest to Newest</option>
                </select>
              </div>
              <div className="movies__list">
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
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Movies;
