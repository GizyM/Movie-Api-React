import React from 'react';
import Logo from "../assets/whitelogo.39850b27.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
        <div className="container">
            <div className="row row__column">
                <Link to="/">
                <figure className="footer__logo">
                    <img src={Logo} className="footer__logo--img" alt="" />
                </figure>
                </Link>
                <div className="footer__list">
                    <Link to="/" className="footer__link">Home</Link>
                    <span className="footer__link no-cursor">About</span>
                    <Link to="/movies" className="footer__link">Movies</Link>
                    <Link to="/favorites" className="footer__link">Favorites</Link>
                </div>
                <div className="footer__copyright">
                    Copyright &copy; 2025 Gizy Michel
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
