import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Rating = ({ index, item }) => {
  return (
    <div className="movie__ratings">
      <FontAwesomeIcon icon="star" key={index} />
      {item.imdbRating}
    </div>
  );
};

export default Rating;