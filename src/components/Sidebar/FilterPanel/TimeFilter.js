import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../store/slices/trainsSlice';
import DoubleSlider from '../../DoubleSlider/DoubleSlider';
import useDebounce from '../../../utils/useDebounce';

const PlusCircleIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>);
const MinusCircleIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>);
const ArrowRightIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#292929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>);
const ArrowLeftIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#292929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>);

const TimeFilter = ({ direction, title }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.trains.filters);
  const [isOpen, setIsOpen] = useState(true);
  const prefix = direction === 'there' ? 'start' : 'end';
  const depFromKey = `${prefix}_departure_hour_from`;
  const depToKey = `${prefix}_departure_hour_to`;
  const arrFromKey = `${prefix}_arrival_hour_from`;
  const arrToKey = `${prefix}_arrival_hour_to`;
  const [localDep, setLocalDep] = useState({ 
    min: filters[depFromKey] || 0, 
    max: filters[depToKey] || 24 
  });
  
  const [localArr, setLocalArr] = useState({ 
    min: filters[arrFromKey] || 0, 
    max: filters[arrToKey] || 24 
  });

  const debouncedDep = useDebounce(localDep, 500);
  const debouncedArr = useDebounce(localArr, 500);

  useEffect(() => {
    if (debouncedDep.min !== filters[depFromKey] || debouncedDep.max !== filters[depToKey]) {
      dispatch(setFilter({ [depFromKey]: debouncedDep.min, [depToKey]: debouncedDep.max }));
    }
  }, [debouncedDep, dispatch, depFromKey, depToKey, filters]);

  useEffect(() => {
    if (debouncedArr.min !== filters[arrFromKey] || debouncedArr.max !== filters[arrToKey]) {
      dispatch(setFilter({ [arrFromKey]: debouncedArr.min, [arrToKey]: debouncedArr.max }));
    }
  }, [debouncedArr, dispatch, arrFromKey, arrToKey, filters]);

  const formatTime = (hour) => `${hour}:00`;

  return (
    <div className="filter-panel__group filter-panel__group--time">
      <div className="accordion">
        
        <div className="accordion__header" onClick={() => setIsOpen(!isOpen)}>
          <div className="accordion__title-wrapper">
            <div className="accordion__icon-box">
              {direction === 'there' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
            </div>
            <span className="accordion__title">{title}</span>
          </div>
          <button className="accordion__toggle-btn" type="button">
            {isOpen ? <MinusCircleIcon /> : <PlusCircleIcon />}
          </button>
        </div>
        
        {isOpen && (
          <div className="accordion__body">
            
            <div className="time-slider-group">
              <span className="time-slider-group__title">Время отбытия</span>
              <div className="time-slider">
                <DoubleSlider 
                  min={0} max={24} 
                  initialMin={localDep.min} 
                  initialMax={localDep.max} 
                  onChange={(values) => setLocalDep(values)} 
                />
                <div className="time-slider__labels">
                  <span>{formatTime(localDep.min)}</span>
                  <span>{formatTime(localDep.max)}</span>
                </div>
              </div>
            </div>

            <div className="time-slider-group">
              <span className="time-slider-group__title">Время прибытия</span>
              <div className="time-slider">
                <DoubleSlider 
                  min={0} max={24} 
                  initialMin={localArr.min} 
                  initialMax={localArr.max} 
                  onChange={(values) => setLocalArr(values)} 
                />
                <div className="time-slider__labels">
                  <span>{formatTime(localArr.min)}</span>
                  <span>{formatTime(localArr.max)}</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default TimeFilter;