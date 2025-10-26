import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Rating = ({ index, movieDetails }) => {
  return (
    <div className="movie__ratings">
      <FontAwesomeIcon icon="star" key={index} />
      {movieDetails?.imdbRating}
    </div>
  );
};

export default Rating;