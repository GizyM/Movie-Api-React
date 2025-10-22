import React, { useState } from "react";
import Movie from "../components/ui/Movie";

const Movies = ({ movies: initialMovies }) => {
  const [movies, setMovies] = useState([initialMovies]);


function filterMovies(filter) {
  console.log("filter");
  if (filter === "newest") {
      Movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  } else if (filter === "oldest") {
    Movies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
  }
}

  return (
    <div id="movies__body">
      <main id="movies__main">
        <section>
          <div className="movies__container">
            <div className="row">
              <div className="movies__header">
                <h2 className="section__title movies__header--title">
                  All Movies
                </h2>
                <select id="movieSort" defaultValue="DEFAULT" onChange={(event) => filterMovies(event.target.value)}>
                    <option value="DEFAULT" disabled>Sort by year</option>
                    <option value="newest">Newest to Oldest</option>
                    <option value="oldest">Oldest to Newest</option>
                </select>
              </div>
              <div className="movies">
                {Movies.map((movie) => (
                  <Movie movie={movie} key={movies.id} />
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
