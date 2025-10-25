import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Year from "./Year";

const Movie = ({ }) => {
  const [img, setImg] = useState();
  const [movieDetails, setMovieDetails] = useState(null);

  const mountedRef = useRef(true);
  
  useEffect(() => {
    mountedRef.current = true;
    const image = new Image();
    image.src = movieDetails?.Poster;
    image.onload = () => {
      setTimeout(() => {
        if (mountedRef.current) {
          setImg(image);
        }
      }, 300);
    };
    return () => {
      mountedRef.current = false;
    }
  })

  return (
    <div className="movie">
      {img ? (
        <>
          <Link to={`/movie/${movieDetails?.imdbID}`}>
            <figure className="movie__img--wrapper">
              <img
                src={movieDetails?.Poster}
                alt=""
                className="movie__img"
              />
            </figure>
          </Link>
          <div className="movie__title">
            <Link to={`/movie/${movieDetails?.imdbID}`} className="movie__title--link">
              {movieDetails?.Title}
            </Link>
          </div>
          <Year
            year={movieDetails?.Year}
          />
        </>
      ) : (
        <> <div className="movie__img--skeleton"></div>
      <div className="skeleton movie__title--skeleton"></div>
      <div className="skeleton movie__year--skeleton"></div></>
      )}
    </div>
  );
};

export default Movie;