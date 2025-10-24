import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loader = () => {
    return (
        <div className="movies__loading">
            <FontAwesomeIcon icon="compact-disc" />
            <p>Loading...</p>
        </div>
    );
};

export default Loader;