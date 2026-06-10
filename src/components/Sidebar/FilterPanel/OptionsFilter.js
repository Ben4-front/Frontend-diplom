import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../store/slices/trainsSlice';

const toggleOptions = [
  { id: 'have_second_class', icon: 'cupe.png', label: 'Купе' },
  { id: 'have_third_class', icon: 'platzkart.png', label: 'Плацкарт' },
  { id: 'have_fourth_class', icon: 'seat.png', label: 'Сидячий' },
  { id: 'have_first_class', icon: 'lux.png', label: 'Люкс' },
  { id: 'have_wifi', icon: 'wifi.png', label: 'Wi-Fi' },
  { id: 'have_express', icon: 'express.png', label: 'Экспресс' },
];

const OptionsFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.trains.filters);

  return (
    <div className="filter-panel__group filter-panel__group--options">
      <div className="toggle-list">
        {toggleOptions.map((item) => (
          <div className="toggle-item" key={item.id}>
            <div className="toggle-item__info">
              <img src={`${process.env.PUBLIC_URL}/images/${item.icon}`} alt={item.label} className="toggle-item__icon" />
              <span className="toggle-item__label">{item.label}</span>
            </div>
            <label className="toggle-item__switch">
              <input 
                type="checkbox" 
                className="toggle-item__checkbox"
                checked={filters[item.id] || false}
                onChange={() => dispatch(setFilter({ [item.id]: !filters[item.id] }))}
              />
              <span className="toggle-item__slider"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionsFilter;