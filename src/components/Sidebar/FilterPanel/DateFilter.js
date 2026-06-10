import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../store/slices/trainsSlice';
import CustomDatePicker from '../../CustomDatePicker/CustomDatePicker'; 

const DateFilter = () => {
  const dispatch = useDispatch();
  const { date_start, date_end } = useSelector((state) => state.trains.filters);

  return (
    <div className="filter-panel__group filter-panel__group--dates">
      
      <label className="filter-panel__label">Дата поездки</label>
      <div className="filter-panel__date-input-wrapper">
        <CustomDatePicker 
          selectedDate={date_start} 
          onChange={(date) => dispatch(setFilter({ date_start: date }))}
          placeholder="ДД/ММ/ГГГГ"
        />
        <img 
          src={`${process.env.PUBLIC_URL}/images/calendar.png`} 
          alt="Календарь" 
          className="filter-panel__date-icon" 
        />
      </div>

      <label className="filter-panel__label filter-panel__label--mt">Дата возвращения</label>
      <div className="filter-panel__date-input-wrapper">
        <CustomDatePicker 
          selectedDate={date_end} 
          onChange={(date) => dispatch(setFilter({ date_end: date }))}
          placeholder="ДД/ММ/ГГГГ"
        />
        <img 
          src={`${process.env.PUBLIC_URL}/images/calendar.png`} 
          alt="Календарь" 
          className="filter-panel__date-icon" 
        />
      </div>
      
    </div>
  );
};

export default DateFilter;