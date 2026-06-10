import React, { useState } from 'react';
import './DoubleSlider.css';

const DoubleSlider = ({ min, max, initialMin, initialMax, onChange }) => {
  const [minVal, setMinVal] = useState(initialMin);
  const [maxVal, setMaxVal] = useState(initialMax);

  const handleMin = (e) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    setMinVal(value);
    if (onChange) onChange({ min: value, max: maxVal });
  };

  const handleMax = (e) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(value);
    if (onChange) onChange({ min: minVal, max: value });
  };


  const leftThumb = ((minVal - min) / (max - min)) * 100;
  const rightThumb = ((maxVal - min) / (max - min)) * 100;
  const progressWidth = rightThumb - leftThumb;

  return (
    <div className="double-slider">
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={minVal} 
        onChange={handleMin} 
        className="double-slider__input double-slider__input--left" 
      />
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={maxVal} 
        onChange={handleMax} 
        className="double-slider__input double-slider__input--right" 
      />
      
      <div className="double-slider__track">
        <div 
          className="double-slider__progress" 
          style={{ left: `${leftThumb}%`, width: `${progressWidth}%` }}
        ></div>
        
        <div className="double-slider__handle" style={{ left: `${leftThumb}%` }}></div>
        <div className="double-slider__handle" style={{ left: `${rightThumb}%` }}></div>
      </div>
    </div>
  );
};

export default DoubleSlider;