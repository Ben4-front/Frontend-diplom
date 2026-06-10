import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo-container">
        <Link to="/" className="header__logo">Лого</Link>
      </div>
      
      <nav className="header__nav">
        <ul className="header__menu">
          <li className="header__menu-item">
            <a href="/#about" className="header__menu-link">О нас</a>
          </li>
          <li className="header__menu-item">
            <a href="/#how-it-works" className="header__menu-link">Как это работает</a>
          </li>
          <li className="header__menu-item">
            <a href="/#reviews" className="header__menu-link">Отзывы</a>
          </li>
          <li className="header__menu-item">
            <a href="#contacts" className="header__menu-link">Контакты</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;