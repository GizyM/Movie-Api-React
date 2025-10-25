import React from "react";
import EmptyLogo from "../assets/undraw_void_wez2.svg";
import { Link } from "react-router-dom";

const Favorites = ({ favorites, changeQuantity, removeItem }) => {
  const total = () => {
    let favorites = 0;
    favorites.forEach((item) => {
      favorites += +((item.Poster || item.Title) * item.quantity);
    });
    return favorites;
  };
  return (
    <div id="movies__body">
      <main id="movies__main">
        <div className="movies__container">
          <div className="row">
            <div className="movie__selected--top">
              <h2 className="favorite__title">Favorites</h2>
            </div>
            <div className="favorites">
              <div className="favorites__header">
                <span className="favorite__movie">Movie</span>
                <span className="favorite__year">Year</span>
              </div>
              <div className="movie__body">
                {favorites.map((item) => {
                  return (
                    <div className="favorite__item">
                      <div className="favorite__movie">
                        <img
                          src={item.Poster}
                          className="favorite__movie--img"
                          alt=""
                        />
                        <div className="favorite__movie--info">
                          <span className="favorite__movie--title">
                            {item.Title}
                          </span>
                          <span className="favorite__movie--year">
                            {item.Year}
                          </span>
                          <button
                            className="favorite__movie--remove"
                            onClick={() => removeItem(item)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="favorites__quantity">
                        <input 
                        type="number"
                        min={0}
                        max={99}
                        className="favorites__input"
                        value={item.quantity}
                        onChange={(event) => 
                          changeQuantity(item, event.target.value)
                        }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              {favorites.length === 0 && (
                <div className="favorite__empty">
                    <img
                    src={EmptyLogo}
                    alt=""
                    className="favorite__empty--img"
                  ></img>
                  <h2>You don't have any favorites here!</h2>
                  <Link to="/movies">
                    <button className="btn">Browse Movies</button>
                  </Link>
                </div>
              )}
            </div>
            {favorites.length > 0 && (
              <div className="total">
                <div className="total__item total">
                  <span>Total</span>
                  <span>{(total() * 1).toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Favorites;
