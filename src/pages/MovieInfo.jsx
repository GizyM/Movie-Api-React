import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const MovieInfo = ({ movies = [], favoriteMovies, setFavoriteMovies, Title, newFav}) => {
  const { searchTerm } = useParams();
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);

  function itemExistsOnFavorites() {
    return Favorites.find(movie => movie.id === +movieDetails?.id)
  }

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${searchTerm}&apikey=826b9a2e`
        );
        if (response.data.Response === "True") {
          setMovieDetails(response.data);
          // console.log(response.data);
        } else {
          setError(response.data.Error);
        }
      } catch (err) {
        setError("Unable to fetch movie details.", err);
      }
      setLoading(false);
    };

    fetchMovieDetails();
  }, [searchTerm]);

if (loading) return <p>Loading...</p>;
if (error) return <span className="red">{error}</span>

  return (
    <div id="movies__body">
      <main id="movies__main">
        <div className="movies__container">
          <div className="row">
            <div className="movie__selected--top">
              <Link to="/movies" className="movie__link">
                <FontAwesomeIcon icon="arrow-left" />
              </Link>
              <Link to="/movies" className="movie__link">
                <h2 className="movie__selected--title--top">Movies</h2>
              </Link>
            </div>
            <div className="movie__selected">
              <figure className="movie__selected--figure">
                <img
                  src={movieDetails?.Poster}
                  alt=""
                  className="movie__selected--img"
                />
              </figure>
              <div className="movie__selected--description">
                <h2 className="movie__selected--title">{movieDetails?.Title}</h2>
                <div className="movie__ratings">
                  <FontAwesomeIcon icon="star" />
                  <p className="movie__summary--rating">{movieDetails?.imdbRating}/10</p>
                </div>
                <div className="movie__summary">
                  <p className="movie__summary--runtime"><b>Runtime: </b>{movieDetails?.Runtime}</p>
                  <p className="movie__summary--released"><b>Release Date: </b>{movieDetails?.Released}</p>
                  <p className="movie__summary--rated"><b>Rated: </b>{movieDetails?.Rated}</p>
                  <h3 className="movie__summary--title">Details</h3>
                  <p className="movie__summary--para"><b>Plot:</b> {movieDetails?.Plot}</p>
                  <p className="movie__summary--actors"><b>Actors:</b> {movieDetails?.Actors}</p>
                  <p className="movie__summary--director"><b>Director:</b> {movieDetails?.Director}</p>
                  <p className="movie__summary--genre"><b>Genre: </b>{movieDetails?.Genre}</p>
                  <p className="movie__summary--boxoffice"><b>Box Office: </b>{movieDetails?.BoxOffice}</p>
                  <p className="movie__summary--awards"><b>Awards: </b> {movieDetails?.Awards}</p>
                </div>
                {itemExistsOnFavorites() ? (
                  <Link to={`/favorites`} className="movie__link">
                    <button className="btn">Check Favorites</button>
                  </Link>
                ) : (
                  <button className="btn" onClick={() => alert(`haven't gotten around to this :()`)}>
                    Add to Favorites
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieInfo;
