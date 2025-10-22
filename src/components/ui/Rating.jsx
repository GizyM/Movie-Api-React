import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Rating = () => {
  return (
    <div className="movie__ratings">
      <FontAwesomeIcon icon="star" key={index} />
      {movie.imdbRating}
    </div>
  );
};

export default Rating;