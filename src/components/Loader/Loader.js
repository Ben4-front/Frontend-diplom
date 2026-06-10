import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader">
      <span className="loader__text">Идет поиск</span>
      <div className="loader__animation-box">
        <img 
          src={`${process.env.PUBLIC_URL}/images/train-loader.png`}
          alt="Поезд" 
          className="loader__train" 
        />
        {/* Желтая линия */}
        <div className="loader__line"></div>
      </div>
    </div>
  );
};

export default Loader;