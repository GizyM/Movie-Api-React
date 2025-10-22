import React from 'react';
import { Link } from "react-router-dom";

const Explore = () => {
  return (
   <section id="explore">
    <div className="container">
        <div className="row row__column">
            <h2>
                Explore more <span className="purple">movies</span>
            </h2>
            <Link to="/movies">
            <button className="btn">Explore movies</button>
            </Link>
        </div>
    </div>
   </section>
  )
}

export default Explore
