import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { format, parseISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchCities, setFormValue, swapCities, clearCityOptions } from '../../store/slices/searchSlice';
import './SearchForm.css';
import { setFilter } from '../../store/slices/trainsSlice'; 

registerLocale('ru', ru);

const SearchForm = ({ isMainPage = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form, cityOptions } = useSelector((state) => state.search);
  const [activeField, setActiveField] = useState(null);
  const capitalizeCity = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleCityChange = (e, field) => {
    const value = e.target.value;
    dispatch(setFormValue({ field, value: { id: '', name: value } }));
    setActiveField(field);
    if (value.trim()) dispatch(fetchCities(value));
    else dispatch(clearCityOptions());
  };

  const handleCitySelect = (city, field) => {
    dispatch(setFormValue({ field, value: { id: city._id, name: capitalizeCity(city.name) } }));
    setActiveField(null);
    dispatch(clearCityOptions());
  };

  const handleDateChange = (date, field) => {
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      dispatch(setFormValue({ field, value: formattedDate }));
    } else {
      dispatch(setFormValue({ field, value: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.fromCity.id || !form.toCity.id) {
      alert('Пожалуйста, выберите города из выпадающего списка!');
      return;
    }

    dispatch(setFilter({
      from_city_id: form.fromCity.id,
      to_city_id: form.toCity.id,
      date_start: form.dateStart, 
      date_end: form.dateEnd
    }));

    if (isMainPage) {
      navigate('/trains');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderCustomHeader = ({ date, decreaseMonth, increaseMonth }) => (
    <div className="custom-calendar-header">
      <button type="button" onClick={decreaseMonth} className="custom-calendar-btn">◀</button>
      <span className="custom-calendar-month">
        {date.toLocaleString('ru', { month: 'long' }).replace(/^./, str => str.toUpperCase())}
      </span>
      <button type="button" onClick={increaseMonth} className="custom-calendar-btn">▶</button>
    </div>
  );

  const formClass = isMainPage ? 'search-form search-form--vertical' : 'search-form search-form--horizontal';

  return (
    <form className={formClass} onSubmit={handleSubmit}>
      <div className="search-form__row">
        
        <div className="search-form__group search-form__group--city">
          <label className="search-form__label">Направление</label>
          <div className="search-form__inputs-wrapper">
            
            <div className="search-form__input-box">
              <input type="text" className="search-form__input" style={{ textTransform: 'capitalize' }} placeholder="Откуда" value={form.fromCity.name} onChange={(e) => handleCityChange(e, 'fromCity')} />
              <div className="search-form__icon-wrapper">
                <img src={`${process.env.PUBLIC_URL}/images/location-icon.png`} alt="Локация" className="search-form__custom-icon" />
              </div>
              {activeField === 'fromCity' && cityOptions.length > 0 && (
                <ul className="search-form__dropdown">
                  {cityOptions.map((city) => <li key={city._id} onClick={() => handleCitySelect(city, 'fromCity')}>{capitalizeCity(city.name)}</li>)}
                </ul>
              )}
            </div>

            <button type="button" className="search-form__swap-btn" onClick={() => dispatch(swapCities())} title="Поменять местами">
              <img src={`${process.env.PUBLIC_URL}/images/swap-icon.png`} alt="Поменять местами" className="search-form__swap-icon" />
            </button>

            <div className="search-form__input-box">
              <input type="text" className="search-form__input" style={{ textTransform: 'capitalize' }} placeholder="Куда" value={form.toCity.name} onChange={(e) => handleCityChange(e, 'toCity')} />
              <div className="search-form__icon-wrapper">
                <img src={`${process.env.PUBLIC_URL}/images/location-icon.png`} alt="Локация" className="search-form__custom-icon" />
              </div>
              {activeField === 'toCity' && cityOptions.length > 0 && (
                <ul className="search-form__dropdown">
                  {cityOptions.map((city) => <li key={city._id} onClick={() => handleCitySelect(city, 'toCity')}>{capitalizeCity(city.name)}</li>)}
                </ul>
              )}
            </div>

          </div>
        </div>

        <div className="search-form__group search-form__group--date">
          <label className="search-form__label">Дата</label>
          <div className="search-form__inputs-wrapper">
            
            <div className="search-form__input-box">
              <DatePicker
                selected={form.dateStart ? parseISO(form.dateStart) : null}
                onChange={(date) => handleDateChange(date, 'dateStart')}
                locale="ru"
                dateFormat="dd.MM.yyyy"
                placeholderText="ДД/ММ/ГГ"
                renderCustomHeader={renderCustomHeader}
                className="search-form__input"
              />
              <div className="search-form__icon-wrapper">
                <img src={`${process.env.PUBLIC_URL}/images/calendar.png`} alt="Календарь" className="search-form__custom-icon" />
              </div>
            </div>

            <div className="search-form__input-box">
              <DatePicker
                selected={form.dateEnd ? parseISO(form.dateEnd) : null}
                onChange={(date) => handleDateChange(date, 'dateEnd')}
                locale="ru"
                dateFormat="dd.MM.yyyy"
                placeholderText="ДД/ММ/ГГ"
                renderCustomHeader={renderCustomHeader}
                className="search-form__input"
              />
              <div className="search-form__icon-wrapper">
                <img src={`${process.env.PUBLIC_URL}/images/calendar.png`} alt="Календарь" className="search-form__custom-icon" />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="search-form__footer">
        <button type="submit" className="search-form__submit-btn">Найти билеты</button>
      </div>
    </form>
  );
};

export default SearchForm;