import React, { useState, useEffect } from "react";
import Movie from "../components/ui/Movie";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://www.omdbapi.com/?s={setMovies}&apikey=826b9a2e');
                const data = await response.json();
                if (data.Response === "True") {
                    setMovies(data.Search); // Assuming the API returns a Search array
                } else {
                    setError(data.Error); // Set error message if no results found
                }
            } catch (err) {
                setError('Failed to fetch movies. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []); // Empty dependency array means this runs once when the component mounts

    if (loading) return <p>Loading...</p>;
    if (error) return <span className="red">{error}</span>;

function filterMovies(filter) {
  console.log("filter");
  if (filter === "newest") {
    setMovies(
      movies
    .sort(
      (a, b) => parseInt(b.Year) - parseInt(a.Year)
    )
  );
  } else if (filter === "oldest") {
    setMovies(
    movies
    .sort((a, b) => parseInt(a.Year) - parseInt(b.Year)
    )
  );
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
                {movies.map((movie) => (
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
