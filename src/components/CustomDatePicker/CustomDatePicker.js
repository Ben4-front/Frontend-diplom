import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';

import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.css'; 

registerLocale('ru', ru);

const CustomDatePicker = ({ selectedDate, onChange, placeholder }) => {
  return (
    <div className="custom-datepicker-wrapper">
      <DatePicker
        selected={selectedDate ? new Date(selectedDate) : null}
        onChange={(date) => onChange(date)}
        locale="ru"
        placeholderText={placeholder || "ДД/ММ/ГГГГ"}
        dateFormat="dd.MM.yyyy"
        dateFormatCalendar="LLLL"
        className="filter-panel__date-input"
        calendarStartDay={1}
      />
    </div>
  );
};

export default CustomDatePicker;