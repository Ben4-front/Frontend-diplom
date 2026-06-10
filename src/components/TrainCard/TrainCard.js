import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedTrain } from '../../store/slices/trainsSlice';

// Импортируем наши векторные иконки
import { TrainIcon, WifiIcon, ExpressIcon, AcIcon, CupIcon } from '../UI/Icons/Icons';

import './TrainCard.css';

const TrainCard = ({ train, customActionBtn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const departure = train.departure;
  const arrival = train.arrival;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    m = m < 10 ? '0' + m : m; 
    return `${h} : ${m}`;
  };

  const handleSelectSeats = () => {
    dispatch(setSelectedTrain(train));
    navigate(`/seats/${departure._id}`);
  };

  const availableClasses = [
    { key: 'fourth', name: 'Сидячий' },
    { key: 'third', name: 'Плацкарт' },
    { key: 'second', name: 'Купе' },
    { key: 'first', name: 'Люкс' },
  ];

  return (
    <article className="train-card">
      
<div className="train-card__left">
<div className="train-card__train-icon-box">
<img src={`${process.env.PUBLIC_URL}/images/train-icon.png`} alt="поезд" />
</div>
  <h4 className="train-card__train-name">{departure.train.name}</h4>
  <div className="train-card__train-route">
    {departure.from.city.name} → <br />
    {departure.to.city.name}
  </div>
</div>

      <div className="train-card__center">
        <div className="train-card__direction">
          <div className="train-card__time-info train-card__time-info_left">
            <span className="train-card__time">{formatTime(departure.from.datetime)}</span>
            <span className="train-card__city">{departure.from.city.name}</span>
            <span className="train-card__station">{departure.from.railway_station_name} вокзал</span>
          </div>

          <div className="train-card__duration-block">
            <span className="train-card__duration">{formatDuration(departure.duration)}</span>
            <img 
              src={`${process.env.PUBLIC_URL}/images/arrow-right-yellow.png`} 
              alt="Туда" 
              className="train-card__arrow-img"
            />
          </div>

          <div className="train-card__time-info train-card__time-info_right">
            <span className="train-card__time">{formatTime(departure.to.datetime)}</span>
            <span className="train-card__city">{departure.to.city.name}</span>
            <span className="train-card__station">{departure.to.railway_station_name} вокзал</span>
          </div>
        </div>

        {arrival && (
          <div className="train-card__direction train-card__direction--return" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px dashed #E5E5E5' }}>
            <div className="train-card__time-info train-card__time-info_left">
              <span className="train-card__time">{formatTime(arrival.from.datetime)}</span>
              <span className="train-card__city">{arrival.from.city.name}</span>
              <span className="train-card__station">{arrival.from.railway_station_name} вокзал</span>
            </div>

            <div className="train-card__duration-block">
              <span className="train-card__duration">{formatDuration(arrival.duration)}</span>
              <img 
                src={`${process.env.PUBLIC_URL}/images/arrow-left-yellow.png`} 
                alt="Обратно" 
                className="train-card__arrow-img"
              />
            </div>

            <div className="train-card__time-info train-card__time-info_right">
              <span className="train-card__time">{formatTime(arrival.to.datetime)}</span>
              <span className="train-card__city">{arrival.to.city.name}</span>
              <span className="train-card__station">{arrival.to.railway_station_name} вокзал</span>
            </div>
          </div>
        )}

      </div>

      <div className="train-card__right">
<div className="train-card__classes">
  {availableClasses.map((cls) => {
    const priceInfo = departure.price_info[cls.key];
    const seatsCount = departure.available_seats_info[cls.key];

    if (priceInfo && seatsCount) {
      const topSeats = Math.ceil(seatsCount / 2) + 7;
      const bottomSeats = Math.floor(seatsCount / 2) - 7 > 0 ? Math.floor(seatsCount / 2) - 7 : 5;

      return (
        <div className="train-card__class-item" key={cls.key}>
          <div className="train-card__class-main-row">
            <span className="train-card__class-name">{cls.name}</span>
            <span className="train-card__seats-count">{seatsCount}</span>
            <div className="train-card__price-wrapper">
              <span className="train-card__price-prefix">от</span>
              <span className="train-card__price-value">
                {priceInfo.bottom_price || priceInfo.top_price}
              </span>
              <span className="train-card__price-currency">₽</span>
            </div>
          </div>
          <div className="train-card__class-hover-details">
            
            {priceInfo.top_price && (
              <div className="train-card__hover-row">
                <span className="train-card__hover-name">верхние</span>
                <span className="train-card__hover-count">{topSeats}</span>
                <span className="train-card__hover-price">
                  {priceInfo.top_price} <span className="train-card__price-currency">₽</span>
                </span>
              </div>
            )}

            {priceInfo.bottom_price && (
              <div className="train-card__hover-row">
                <span className="train-card__hover-name">нижние</span>
                <span className="train-card__hover-count">{bottomSeats}</span>
                <span className="train-card__hover-price">
                  {priceInfo.bottom_price} <span className="train-card__price-currency">₽</span>
                </span>
              </div>
            )}

          </div>

        </div>
      );
    }
    return null;
  })}
</div>

        <div className="train-card__actions">
          <div className="train-card__amenities">
            
            {(train.have_wifi || departure.have_wifi) && (
              <WifiIcon className="train-card__amenity-icon" title="Wi-Fi" />
            )}
            
            {(train.is_express || departure.is_express) && (
              <ExpressIcon className="train-card__amenity-icon" title="Экспресс" />
            )}

            {(train.have_air_conditioning || departure.have_air_conditioning) && (
              <AcIcon className="train-card__amenity-icon" title="Кондиционер" />
            )}
            
            <CupIcon className="train-card__amenity-icon" title="Питание" />

          </div>

          {customActionBtn ? (
            customActionBtn
          ) : (
            <button className="train-card__btn" onClick={handleSelectSeats}>
              Выбрать места
            </button>
          )}

        </div>
      </div>

    </article>
  );
};

export default TrainCard;