import './App.css';
import Nav from "./components/Nav";
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movies from "./pages/Movies";
import MovieInfo from "./pages/MovieInfo";
import React, { useState, useEffect } from "react";
import Favorites from "./pages/Favorites";

function App() {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [storedFavorites, setStoredFavorites] = useState([]);
  
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  useEffect(() => {
    const localValuesGet = JSON.parse(localStorage.getItem("favorites"));
    setStoredFavorites(localValuesGet);
  }, [favoriteMovies]);
  
  function changeQuantity(movie, quantity) {
    setMovies(
      movies.map((item) =>
        item.id === movie.id
      ? {
        ...item, 
        quantity: +quantity
      }
      :item
      )
    );
  }

  function removeItem(item) {
    setStoredFavorites(favoriteMovies.filter(movie => movie.id !== item.id))
  }

  useEffect(() => {
    console.log(storedFavorites);
  }, [storedFavorites]);


  return (
    <Router>
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies movies={movies} />} />
        <Route
        path="/movie/:searchTerm"
        element={<MovieInfo movies={movies} favoriteMovies={favoriteMovies} setFavoriteMovies={setFavoriteMovies} />}
        />
           <Route
          path="/favorites"
          element={ (
            <Favorites
            storedFavorites={storedFavorites}
              setStoredFavorites={setStoredFavorites}
              favoriteMovies={favoriteMovies}
              setFavoriteMovies={setFavoriteMovies}
              changeQuantity={changeQuantity}
              removeItem={removeItem}
            />
          )}
        />
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
