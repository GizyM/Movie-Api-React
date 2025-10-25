import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchTerm) return;
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=${encodeURIComponent(
            searchTerm
          )}&apikey=826b9a2e`
        );

        if (response.data.Response === "True") {
          setMovies(response.data.Search);
        } else {
          setError(response.data.Error);
          setMovies([]);
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
        setMovies([]);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [searchTerm]);

  const filterMovies = (filter) => {
    const sorted = [...movies];
    if (filter === "newest") {
      sorted.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    } else if (filter === "oldest") {
      sorted.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    }
    setMovies(sorted);
  };

  const viewDetails = (id) => navigate(`/movie/${id}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <span className="red">{error}</span>;

  return (
    <div id="movies__body">
      <main id="movies__main">
        <section>
          <div className="movies__container">
            <div className="row">
              <div className="movies__header">
                <h2 className="section__title movies__header--title">
                  Search Results for "{searchTerm}"
                </h2>
                <select
                  id="movieSort"
                  defaultValue="DEFAULT"
                  onChange={(event) => filterMovies(event.target.value)}
                >
                  <option value="DEFAULT" disabled>
                    Sort by year
                  </option>
                  <option value="newest">Newest to Oldest</option>
                  <option value="oldest">Oldest to Newest</option>
                </select>
              </div>
               <div className="movies__list">
                {movies.map((item) => (
                  <div
                    key={item.imdbID}
                    className="movie"
                    onClick={() => viewDetails(item.imdbID)}
                  >
                    <img
                      src={item.Poster !== "N/A" ? item.Poster : "placeholder.jpg"}
                      alt={item.Title}
                      className="movie__poster"
                    />
                    <h3>{item.Title}</h3>
                    <p>{item.Year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Movies;
