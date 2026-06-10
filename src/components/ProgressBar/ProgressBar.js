import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Билеты' },
    { id: 2, label: 'Пассажиры' },
    { id: 3, label: 'Оплата' },
    { id: 4, label: 'Проверка' },
  ];

  return (
    <div className="progress-bar">
      <div className="progress-bar__wrapper">
        {steps.map((step) => {
          const isActive = step.id <= currentStep;
          
          return (
            <div 
              key={step.id} 
              className={`progress-bar__step ${isActive ? 'progress-bar__step--active' : ''}`}
            >
              <div className="progress-bar__number">{step.id}</div>
              <div className="progress-bar__label">{step.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;