import React from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Year from "../components/ui/Year";
import Movie from "../components/ui/Movie";
import Rating from "../components/ui/Rating";

const MovieInfo = ({ movies, addToFavorites, favorite }) => {
  const { id } = useParams();
  const movie = movies.find((movie) => +movie.id === +id);

  function addToFavorites(movie) {
    addToFavorites(movie);
  }

  function movieExistsOnFavorites() {
    return favorite.find((movie) => movie.id === +id);
  }

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
              <figure ClassName="movie__selected--figure">
                <img
                  src={movie.Poster}
                  alt=""
                  className="movie__selected--img"
                />
              </figure>
              <div className="movie__selected--description">
                <h2 className="movie__selected--title">{movie.Title}</h2>
                <Rating rating={movie.imdbRating} />
                <Year year={movie.Year} />
                <div className="movie__summary">
                  <h3 className="movie__summary--title">Plot</h3>
                  <p className="movie__summary--para">{movie.Plot}</p>
                  <p className="movie__summary--actors">{movie.Actors}</p>
                  <p className="movie__summary--director">{movie.Director}</p>
                  <p className="movie__summary--genre">{movie.Genre}</p>
                </div>
                {movieExistsOnFavorites() ? (
                  <Link to={`/favorites`} className="movie__link">
                    <button className="btn">Check Favorites</button>
                  </Link>
                ) : (
                  <button className="btn" onClick={() => addToFavorites(movie)}>
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
