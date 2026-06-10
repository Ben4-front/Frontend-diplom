import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../store/slices/trainsSlice';
import DoubleSlider from '../../DoubleSlider/DoubleSlider';
import useDebounce from '../../../utils/useDebounce';

const PriceFilter = () => {
  const dispatch = useDispatch();
  
  const { price_from, price_to } = useSelector((state) => state.trains.filters);
  
  const [localPrice, setLocalPrice] = useState({ 
    min: price_from || 0, 
    max: price_to || 10000 
  });
  
  const debouncedPrice = useDebounce(localPrice, 500);

  useEffect(() => {
    if (debouncedPrice.min !== price_from || debouncedPrice.max !== price_to) {
      dispatch(setFilter({ 
        price_from: debouncedPrice.min, 
        price_to: debouncedPrice.max 
      }));
    }
  }, [debouncedPrice.min, debouncedPrice.max, price_from, price_to, dispatch]);

  return (
    <div className="filter-panel__group filter-panel__group--price">
      <h3 className="filter-panel__title">Стоимость</h3>
      <div className="price-slider">
        <div className="price-slider__labels">
          <span>от</span>
          <span>до</span>
        </div>
        
        <DoubleSlider 
          min={0} 
          max={10000} 
          initialMin={localPrice.min} 
          initialMax={localPrice.max} 
          onChange={(values) => setLocalPrice(values)} 
        />
        
        <div className="price-slider__values">
          <span>{localPrice.min}</span>
          <span>{localPrice.max}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;