import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './OrderDetailsSidebar.css';

const OrderDetailsSidebar = () => {
  const [isOutboundOpen, setIsOutboundOpen] = useState(true);
  const [isReturnOpen, setIsReturnOpen] = useState(true);
  const [isPassengersOpen, setIsPassengersOpen] = useState(true);

  const train = useSelector((state) => state.search?.selectedTrain || state.trains?.selectedTrain); 
  const selectedSeats = useSelector((state) => state.seats.selectedSeats);
  const passengers = useSelector((state) => state.passengers.passengers);

  const getToggleIcon = (isOpen) => isOpen ? `${process.env.PUBLIC_URL}/images/minus-white.png` : `${process.env.PUBLIC_URL}/images/plus-white.png`;

  const formatTime = (timestamp) => {
    if (!timestamp) return null;
    return new Date(timestamp * 1000).toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return null;
    return new Date(timestamp * 1000).toLocaleDateString('ru');
  };

  const formatDuration = (seconds) => {
    if (!seconds) return null;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h} : ${m < 10 ? '0' + m : m}`;
  };

  const capitalizeCity = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const outboundCount = selectedSeats.filter(s => s.trainType === 'outbound').length;
  const returnCount = selectedSeats.filter(s => s.trainType === 'return').length;
  const realPassengersCount = Math.max(outboundCount, returnCount) || 1;

  const childCount = passengers.filter(p => p.type === 'child').length;
  const adultCount = passengers.length > 0 ? (passengers.length - childCount) : realPassengersCount;

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  let adultsPrice = 0;
  let childsPrice = 0;

  if (totalPrice > 0) {
    if (childCount === 0) {
      adultsPrice = totalPrice;
    } else if (adultCount === 0) {
      childsPrice = totalPrice;
    } else {
      const sortedPrices = selectedSeats.map(s => s.price).sort((a, b) => b - a); 
      const ratio = selectedSeats.length / passengers.length;
      const adultTicketsCount = Math.round(adultCount * ratio);
      
      adultsPrice = sortedPrices.slice(0, adultTicketsCount).reduce((sum, p) => sum + p, 0);
      childsPrice = sortedPrices.slice(adultTicketsCount).reduce((sum, p) => sum + p, 0);
    }
  }

  const pluralize = (count, words) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return `${count} ${words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5]]}`;
  };

  const outbound = train?.departure;
  const returnFlight = train?.arrival;

  return (
    <aside className="sidebar-details">
      <div className="sidebar-details__header">
        <h3 className="sidebar-details__main-title">ДЕТАЛИ ПОЕЗДКИ</h3>
      </div>

      {outbound && (
        <div className="sidebar-details__section">
          <div className="sidebar-details__section-header" onClick={() => setIsOutboundOpen(!isOutboundOpen)}>
            <div className="sidebar-details__title-group">
              <img src={`${process.env.PUBLIC_URL}/images/arrow-right.png`} alt="Туда" className="sidebar-details__icon" />
              <h4 className="sidebar-details__title">Туда</h4>
              <span className="sidebar-details__date">{formatDate(outbound?.from?.datetime) || '30.08.2018'}</span>
            </div>
            <button className="sidebar-details__toggle-btn">
              <img src={getToggleIcon(isOutboundOpen)} alt="toggle" />
            </button>
          </div>

          {isOutboundOpen && (
            <div className="sidebar-details__content">
              <div className="sidebar-details__train-info">
                <div className="sidebar-details__info-row">
                  <span className="sidebar-details__info-label">№ Поезда</span>
                  <span className="sidebar-details__info-value">{outbound?.train?.name || '116С'}</span>
                </div>
                <div className="sidebar-details__info-row">
                  <span className="sidebar-details__info-label">Название</span>
                  <span className="sidebar-details__info-value">
                    {capitalizeCity(outbound?.from?.city?.name) || 'Адлер'}<br/>
                    {capitalizeCity(outbound?.to?.city?.name) || 'Санкт-Петербург'}
                  </span>
                </div>
              </div>

              <div className="sidebar-details__time-info">
                <div className="sidebar-details__time-col">
                  <span className="sidebar-details__time">{formatTime(outbound?.from?.datetime) || '00:10'}</span>
                  <span className="sidebar-details__date-small">{formatDate(outbound?.from?.datetime) || '30.08.2018'}</span>
                  <span className="sidebar-details__city">{capitalizeCity(outbound?.from?.city?.name) || 'Москва'}</span>
                  <span className="sidebar-details__station">{outbound?.from?.railway_station_name || 'Курский'}<br/>вокзал</span>
                </div>
                <div className="sidebar-details__duration">
                  <span className="sidebar-details__duration-time">{formatDuration(outbound?.duration) || '9 : 42'}</span>
                  <img src={`${process.env.PUBLIC_URL}/images/arrow-right-yellow.png`} alt="arrow" className="sidebar-details__duration-arrow" />
                </div>
                <div className="sidebar-details__time-col sidebar-details__time-col--right">
                  <span className="sidebar-details__time">{formatTime(outbound?.to?.datetime) || '09:52'}</span>
                  <span className="sidebar-details__date-small">{formatDate(outbound?.to?.datetime) || '31.08.2018'}</span>
                  <span className="sidebar-details__city">{capitalizeCity(outbound?.to?.city?.name) || 'Санкт-Петербург'}</span>
                  <span className="sidebar-details__station">{outbound?.to?.railway_station_name || 'Ладожский'}<br/>вокзал</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {returnFlight && (
        <div className="sidebar-details__section">
          <div className="sidebar-details__section-header" onClick={() => setIsReturnOpen(!isReturnOpen)}>
            <div className="sidebar-details__title-group">
              <img src={`${process.env.PUBLIC_URL}/images/arrow-left.png`} alt="Обратно" className="sidebar-details__icon" />
              <h4 className="sidebar-details__title">Обратно</h4>
              <span className="sidebar-details__date">{formatDate(returnFlight.from.datetime) || '09.09.2018'}</span>
            </div>
            <button className="sidebar-details__toggle-btn">
              <img src={getToggleIcon(isReturnOpen)} alt="toggle" />
            </button>
          </div>

          {isReturnOpen && (
            <div className="sidebar-details__content">
              <div className="sidebar-details__train-info">
                <div className="sidebar-details__info-row">
                  <span className="sidebar-details__info-label">№ Поезда</span>
                  <span className="sidebar-details__info-value">{returnFlight.train.name || '116С'}</span>
                </div>
                <div className="sidebar-details__info-row">
                  <span className="sidebar-details__info-label">Название</span>
                  <span className="sidebar-details__info-value">
                    {capitalizeCity(returnFlight.from.city.name) || 'Адлер'}<br/>
                    {capitalizeCity(returnFlight.to.city.name) || 'Санкт-Петербург'}
                  </span>
                </div>
              </div>

              <div className="sidebar-details__time-info">
                <div className="sidebar-details__time-col">
                  <span className="sidebar-details__time">{formatTime(returnFlight.from.datetime) || '00:10'}</span>
                  <span className="sidebar-details__date-small">{formatDate(returnFlight.from.datetime) || '09.09.2018'}</span>
                  <span className="sidebar-details__city">{capitalizeCity(returnFlight.from.city.name) || 'Москва'}</span>
                  <span className="sidebar-details__station">{returnFlight.from.railway_station_name || 'Курский'}<br/>вокзал</span>
                </div>
                <div className="sidebar-details__duration">
                  <span className="sidebar-details__duration-time">{formatDuration(returnFlight.duration) || '9 : 42'}</span>
                  <img src={`${process.env.PUBLIC_URL}/images/arrow-left-yellow.png`} alt="arrow" className="sidebar-details__duration-arrow" />
                </div>
                <div className="sidebar-details__time-col sidebar-details__time-col--right">
                  <span className="sidebar-details__time">{formatTime(returnFlight.to.datetime) || '09:52'}</span>
                  <span className="sidebar-details__date-small">{formatDate(returnFlight.to.datetime) || '08.09.2018'}</span>
                  <span className="sidebar-details__city">{capitalizeCity(returnFlight.to.city.name) || 'Санкт-Петербург'}</span>
                  <span className="sidebar-details__station">{returnFlight.to.railway_station_name || 'Ладожский'}<br/>вокзал</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="sidebar-details__section">
        <div className="sidebar-details__section-header" onClick={() => setIsPassengersOpen(!isPassengersOpen)}>
          <div className="sidebar-details__title-group">
            <img src={`${process.env.PUBLIC_URL}/images/user-yellow.png`} alt="Пассажиры" className="sidebar-details__icon" />
            <h4 className="sidebar-details__title">Пассажиры</h4>
          </div>
          <button className="sidebar-details__toggle-btn">
            <img src={getToggleIcon(isPassengersOpen)} alt="toggle" />
          </button>
        </div>

        {isPassengersOpen && (
          <div className="sidebar-details__content">
            
            {adultCount > 0 && (
              <div className="sidebar-details__passenger-row">
                <span className="sidebar-details__passenger-type">
                  {pluralize(adultCount, ['Взрослый', 'Взрослых', 'Взрослых'])}
                </span>
                <span className="sidebar-details__passenger-price">
                  <span className="price-val">
                    {(totalPrice > 0 ? adultsPrice : 5840).toLocaleString('ru-RU')}
                  </span> 
                  <span className="currency">₽</span>
                </span>
              </div>
            )}
            
            {childCount > 0 && (
              <div className="sidebar-details__passenger-row">
                <span className="sidebar-details__passenger-type">
                  {pluralize(childCount, ['Ребенок', 'Ребенка', 'Детей'])}
                </span>
                <span className="sidebar-details__passenger-price">
                  <span className="price-val">
                    {(totalPrice > 0 ? childsPrice : 1920).toLocaleString('ru-RU')}
                  </span> 
                  <span className="currency">₽</span>
                </span>
              </div>
            )}

          </div>
        )}
      </div>

      <div className="sidebar-details__footer">
        <span className="sidebar-details__total-label">ИТОГ</span>
        <span className="sidebar-details__total-price">
          <span className="total-val">
            {(totalPrice > 0 ? totalPrice : 7760).toLocaleString('ru-RU')}
          </span> 
          <span className="currency-large">₽</span>
        </span>
      </div>
    </aside>
  );
};

export default OrderDetailsSidebar;