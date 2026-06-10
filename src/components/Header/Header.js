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
            <Link to="/#about" className="header__menu-link">О нас</Link>
          </li>
          <li className="header__menu-item">
            <Link to="/#how-it-works" className="header__menu-link">Как это работает</Link>
          </li>
          <li className="header__menu-item">
            <Link to="/#reviews" className="header__menu-link">Отзывы</Link>
          </li>
          <li className="header__menu-item">
            <Link to="/#contacts" className="header__menu-link">Контакты</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;