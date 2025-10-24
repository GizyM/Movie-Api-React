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
  const [favorites, setFavorites] = useState([]);
  
  function addToFavorites(movie) {
    setFavorites([...favorites, { ...movie, quantity: 1 }]);
  }

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
    setFavorites(favorites.filter(movie => movie.id !== item.id))
  }

  function numberOfItems() {
    let counter = 0;
    favorites.forEach(item => {
      counter += item.quantity
    })
    return counter;
  }

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);


  return (
    <Router>
    <div className="App">
      <Nav numberOfItems={numberOfItems()} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies movies={movies} />} />
        <Route
        path="/movies/:id"
        element={<MovieInfo movies={movies} addToFavorites={addToFavorites} favorites={favorites} />}
        />
           <Route
          path="/favorites"
          element={ (
            <Favorites
              movies={movies}
              favorites={favorites}
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
