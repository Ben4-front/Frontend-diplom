import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const handleScroll = (id) => {
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header className="header">
      <div className="header__logo-container">
        <Link to="/" className="header__logo">Лого</Link>
      </div>
      
      <nav className="header__nav">
        <ul className="header__menu">
          <li className="header__menu-item">
            <span 
              onClick={() => handleScroll('about')} 
              className="header__menu-link" 
              style={{ cursor: 'pointer' }}
            >
              О нас
            </span>
          </li>
          <li className="header__menu-item">
            <span 
              onClick={() => handleScroll('how-it-works')} 
              className="header__menu-link" 
              style={{ cursor: 'pointer' }}
            >
              Как это работает
            </span>
          </li>
          <li className="header__menu-item">
            <span 
              onClick={() => handleScroll('reviews')} 
              className="header__menu-link" 
              style={{ cursor: 'pointer' }}
            >
              Отзывы
            </span>
          </li>
          <li className="header__menu-item">
            <span 
              onClick={() => handleScroll('contacts')} 
              className="header__menu-link" 
              style={{ cursor: 'pointer' }}
            >
              Контакты
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;