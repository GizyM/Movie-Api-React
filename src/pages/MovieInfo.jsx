import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Year from "../components/ui/Year";
import Rating from "../components/ui/Rating";
import axios from "axios";
import Loader from "../components/Loader";

const MovieInfo = ({ movies, favorite }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const movie = movies.find((movie) => +movie.id === +id);

  function movieExistsOnFavorites() {
    return favorite.find((movie) => movie.id === +id);
  }

  const addFavorite = (movie) => {
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
        setFavorites([...favorites, movie]);
    } else {
        alert('This movie is already in your favorites!')
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${id}&apikey=${
            import.meta.env.VITE_APP_OMDB_API_KEY
          }`
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
  }, [id]);

if (loading) return <Loader />;
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
                  src={movieDetails.Poster}
                  alt=""
                  className="movie__selected--img"
                />
              </figure>
              <div className="movie__selected--description">
                <h2 className="movie__selected--title">{movie.Title}</h2>
                <Rating rating={movieDetails.imdbRating} />
                <Year year={movieDetails.Year} />
                <div className="movie__summary">
                  <h3 className="movie__summary--title">Plot</h3>
                  <p className="movie__summary--para">{movieDetails.Plot}</p>
                  <p className="movie__summary--actors">{movieDetails.Actors}</p>
                  <p className="movie__summary--director">{movieDetails.Director}</p>
                  <p className="movie__summary--genre">{movieDetails.Genre}</p>
                  <p className="movie__summary--boxoffice">{movieDetails.BoxOffice}</p>
                  <p className="movie__summary--runtime">{movieDetails.Runtime}</p>
                </div>
                {movieExistsOnFavorites() ? (
                  <Link to={`/favorites`} className="movie__link">
                    <button className="btn">Check Favorites</button>
                  </Link>
                ) : (
                  <button className="btn" onClick={() => addFavorite(movie)}>
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
