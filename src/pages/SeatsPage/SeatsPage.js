import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarriages, clearSeats } from '../../store/slices/seatsSlice';

import Header from '../../components/Header/Header';
import SearchForm from '../../components/SearchForm/SearchForm';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import CarriageMap from '../../components/CarriageMap/CarriageMap';
import Footer from '../../components/Footer/Footer';

import './SeatsPage.css';

const SeatsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedSeats } = useSelector((state) => state.seats);
  const [activeWagonType, setActiveWagonType] = useState('coupe');
  const [activeWagonTypeReturn, setActiveWagonTypeReturn] = useState('platzkart');

  const [adultTickets, setAdultTickets] = useState(1);
  const [childTickets, setChildTickets] = useState(0);
  const [babyTickets, setBabyTickets] = useState(0);

  const [activeInputOutbound, setActiveInputOutbound] = useState(null); 
  const [activeInputReturn, setActiveInputReturn] = useState(null); 
  
  const totalTickets = adultTickets + childTickets;

  const handleIncrement = (type) => {
    if (type === 'adult' && adultTickets < 4) setAdultTickets(prev => prev + 1);
    if (type === 'child' && childTickets < 3) setChildTickets(prev => prev + 1);
    if (type === 'baby' && babyTickets < adultTickets) setBabyTickets(prev => prev + 1);
  };

  const handleDecrement = (type) => {
    if (type === 'adult' && adultTickets > 0) setAdultTickets(prev => prev - 1);
    if (type === 'child' && childTickets > 0) setChildTickets(prev => prev - 1);
    if (type === 'baby' && babyTickets > 0) setBabyTickets(prev => prev - 1);
  };

  useEffect(() => {
    if (babyTickets > adultTickets) {
      setBabyTickets(adultTickets);
    }
  }, [adultTickets, babyTickets]);

  useEffect(() => {
    dispatch(clearSeats());
    if (id) {
      dispatch(fetchCarriages(id));
    }
  }, [dispatch, id]);

  const handleNextStep = () => {
    if (selectedSeats.length === 0) {
      alert('Пожалуйста, выберите хотя бы одно место!');
      return;
    }
    navigate('/passengers');
  };

  const MOCK_CARRIAGES_COUPE = [{
    coach: { _id: "mock-coupe", name: "07", class_type: "second", bottom_price: 3530, top_price: 2920, have_wifi: true, have_air_conditioning: true },
    seats: Array.from({ length: 32 }, (_, i) => ({ index: i + 1, available: i % 4 !== 0 }))
  }];

  const MOCK_CARRIAGES_PLATZKART = [{
    coach: { _id: "mock-platzkart", name: "09", class_type: "third", bottom_price: 2020, top_price: 1920, have_wifi: false, have_air_conditioning: true },
    seats: Array.from({ length: 48 }, (_, i) => ({ index: i + 1, available: Math.random() > 0.3 }))
  }];

  const luxSeatsMock = [];
  for (let i = 1; i <= 18; i++) {
    if (i !== 2 && i !== 17) luxSeatsMock.push({ index: i, available: Math.random() > 0.2 });
  }

  const MOCK_CARRIAGES_LUX = [{
    coach: { _id: "mock-lux", name: "10", class_type: "first", bottom_price: 7000, top_price: 7000, have_wifi: true, have_air_conditioning: true },
    seats: luxSeatsMock
  }];

  const MOCK_CARRIAGES_SEAT = [{
    coach: { _id: "mock-seat", name: "12", class_type: "fourth", bottom_price: 1200, top_price: 1200, have_wifi: true, have_air_conditioning: true },
    seats: Array.from({ length: 62 }, (_, i) => ({ index: i + 1, available: Math.random() > 0.4 })) 
  }];

  let filteredOutbound = [];
  if (activeWagonType === 'coupe') filteredOutbound = MOCK_CARRIAGES_COUPE;
  else if (activeWagonType === 'platzkart') filteredOutbound = MOCK_CARRIAGES_PLATZKART;
  else if (activeWagonType === 'lux') filteredOutbound = MOCK_CARRIAGES_LUX;
  else if (activeWagonType === 'seat') filteredOutbound = MOCK_CARRIAGES_SEAT;

  // Фильтруем вагоны ОБРАТНО
  let filteredReturn = [];
  if (activeWagonTypeReturn === 'coupe') filteredReturn = MOCK_CARRIAGES_COUPE;
  else if (activeWagonTypeReturn === 'platzkart') filteredReturn = MOCK_CARRIAGES_PLATZKART;
  else if (activeWagonTypeReturn === 'lux') filteredReturn = MOCK_CARRIAGES_LUX;
  else if (activeWagonTypeReturn === 'seat') filteredReturn = MOCK_CARRIAGES_SEAT;
  
  const status = 'success';

  return (
    <div className="seats-page">
      
      <section className="trains-page__hero" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/header-bg-blurred.png)` }}>
        <div className="trains-page__hero-wrapper wrapper">
          <SearchForm />
        </div>
      </section>

      <ProgressBar currentStep={1} />

      <main className="seats-page__main wrapper">
        <Sidebar />

        <section className="seats-page__content">
          <h2 className="seats-page__title">ВЫБОР МЕСТ</h2>

          <div className="train-details-block">
            
            <div className="train-details-block__header">
              <div className="direction-badge">
                <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 7H15V0L30 10L15 20V13H0V7Z" fill="#FFFFFF"/>
                </svg>
              </div>
              <button className="btn-choose-other" onClick={() => navigate('/trains')}>Выбрать другой поезд</button>
            </div>

            <div className="train-details-block__info">
              <div className="train-details-block__train-icon">
                <div className="train-details-icon-wrapper">
                  <img src={`${process.env.PUBLIC_URL}/images/train-yellow.png`} alt="train" />
                </div>
                <span className="train-details-block__train-number">116С</span>
                <span className="train-details-block__train-route">Адлер →<br/>Москва →<br/>Санкт-Петербург</span>
              </div>
              
              <div className="train-details-block__time-info">
                <div className="time-col">
                  <span className="time-col__time">00:10</span>
                  <span className="time-col__city">Москва</span>
                  <span className="time-col__station">Курский вокзал</span>
                </div>
                <div className="duration-col">
                  <img src={`${process.env.PUBLIC_URL}/images/arrow-right-yellow.png`} alt="arrow" />
                </div>
                <div className="time-col time-col--right">
                  <span className="time-col__time">09:52</span>
                  <span className="time-col__city">Санкт-Петербург</span>
                  <span className="time-col__station">Ладожский вокзал</span>
                </div>
              </div>

              <div className="train-details-block__duration-total">
                <img src={`${process.env.PUBLIC_URL}/images/clock-yellow.png`} alt="clock" />
                <div className="duration-total__text">
                  <span>9 часов</span>
                  <span>42 минуты</span>
                </div>
              </div>
            </div>

            <div className="ticket-quantity">
              <h3 className="ticket-quantity__title">Количество билетов</h3>
              <div className="ticket-quantity__wrapper">
                
                <div className="ticket-input-box">
                  <div className={`ticket-input-box__field ${activeInputOutbound === 'adult' ? 'ticket-input-box__field--active' : ''}`}>
                    <label htmlFor="adult-out">Взрослых —</label>
                    <input id="adult-out" type="number" min="0" max="4" value={adultTickets} onChange={(e) => setAdultTickets(e.target.value === '' ? '' : Math.max(0, Math.min(4, parseInt(e.target.value))))} onFocus={() => setActiveInputOutbound('adult')} onBlur={() => { setActiveInputOutbound(null); if (adultTickets === '') setAdultTickets(0); }} />
                    <div className="ticket-input-box__controls">
                      <button type="button" className="ticket-btn ticket-btn--up" onClick={() => handleIncrement('adult')} disabled={adultTickets >= 4} />
                      <button type="button" className="ticket-btn ticket-btn--down" onClick={() => handleDecrement('adult')} disabled={adultTickets <= 0} />
                    </div>
                  </div>
                  <p className="ticket-input-box__desc">Можно добавить еще {Math.max(0, 4 - (adultTickets || 0))} пассажиров</p>
                </div>

                <div className="ticket-input-box">
                  <div className={`ticket-input-box__field ${activeInputOutbound === 'child' ? 'ticket-input-box__field--active' : ''}`}>
                    <label htmlFor="child-out">Детских —</label>
                    <input id="child-out" type="number" min="0" max="3" value={childTickets} onChange={(e) => setChildTickets(e.target.value === '' ? '' : Math.max(0, Math.min(3, parseInt(e.target.value))))} onFocus={() => setActiveInputOutbound('child')} onBlur={() => { setActiveInputOutbound(null); if (childTickets === '') setChildTickets(0); }} />
                    <div className="ticket-input-box__controls">
                      <button type="button" className="ticket-btn ticket-btn--up" onClick={() => handleIncrement('child')} disabled={childTickets >= 3} />
                      <button type="button" className="ticket-btn ticket-btn--down" onClick={() => handleDecrement('child')} disabled={childTickets <= 0} />
                    </div>
                  </div>
                  <p className="ticket-input-box__desc">Можно добавить еще {Math.max(0, 3 - (childTickets || 0))} детей до 10 лет.</p>
                </div>

                <div className="ticket-input-box">
                  <div className={`ticket-input-box__field ${activeInputOutbound === 'baby' ? 'ticket-input-box__field--active' : ''}`}>
                    <label htmlFor="baby-out">Детских «без места» —</label>
                    <input id="baby-out" type="number" min="0" max={adultTickets || 0} value={babyTickets} onChange={(e) => setBabyTickets(e.target.value === '' ? '' : Math.max(0, Math.min(adultTickets, parseInt(e.target.value))))} onFocus={() => setActiveInputOutbound('baby')} onBlur={() => { setActiveInputOutbound(null); if (babyTickets === '') setBabyTickets(0); }} />
                    <div className="ticket-input-box__controls">
                      <button type="button" className="ticket-btn ticket-btn--up" onClick={() => handleIncrement('baby')} disabled={babyTickets >= adultTickets} />
                      <button type="button" className="ticket-btn ticket-btn--down" onClick={() => handleDecrement('baby')} disabled={babyTickets <= 0} />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="wagon-types">
              <h3 className="wagon-types__title">Тип вагона</h3>
              <div className="wagon-types__list">
                <div className={`wagon-type-item ${activeWagonType === 'seat' ? 'wagon-type-item--active' : ''}`} onClick={() => setActiveWagonType('seat')}>
                  <img src={`${process.env.PUBLIC_URL}/images/seat.png`} alt="Сидячий" className="wagon-type-item__icon" />
                  <span className="wagon-type-item__label">Сидячий</span>
                </div>
                <div className={`wagon-type-item ${activeWagonType === 'platzkart' ? 'wagon-type-item--active' : ''}`} onClick={() => setActiveWagonType('platzkart')}>
                  <img src={`${process.env.PUBLIC_URL}/images/platzkart.png`} alt="Плацкарт" className="wagon-type-item__icon" />
                  <span className="wagon-type-item__label">Плацкарт</span>
                </div>
                <div className={`wagon-type-item ${activeWagonType === 'coupe' ? 'wagon-type-item--active' : ''}`} onClick={() => setActiveWagonType('coupe')}>
                  <img src={`${process.env.PUBLIC_URL}/images/cupe.png`} alt="Купе" className="wagon-type-item__icon" />
                  <span className="wagon-type-item__label">Купе</span>
                </div>
                <div className={`wagon-type-item ${activeWagonType === 'lux' ? 'wagon-type-item--active' : ''}`} onClick={() => setActiveWagonType('lux')}>
                  <img src={`${process.env.PUBLIC_URL}/images/lux.png`} alt="Люкс" className="wagon-type-item__icon" />
                  <span className="wagon-type-item__label">Люкс</span>
                </div>
              </div>
            </div>

            {status === 'success' && filteredOutbound.length > 0 && (
              <div className="seats-page__carriages-list">
                {filteredOutbound.map((coach) => (
                  <CarriageMap key={`${coach.coach._id}-out`} coach={coach} totalTickets={totalTickets} trainType="outbound" />
                ))}
              </div>
            )}
          </div>


          <div className="train-details-block">
            
            <div className="train-details-block__header train-details-block__header--return">
              <div className="direction-badge">
                <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 7H15V0L0 10L15 20V13H30V7Z" fill="#FFFFFF"/>
                </svg>
              </div>
              <button className="btn-choose-other" onClick={() => navigate('/trains')}>Выбрать другой поезд</button>
            </div>

            <div className="train-details-block__info">
              <div className="train-details-block__train-icon">
                <div className="train-details-icon-wrapper">
                  <img src={`${process.env.PUBLIC_URL}/images/train-yellow.png`} alt="train" />
                </div>
                <span className="train-details-block__train-number">116С</span>
                <span className="train-details-block__train-route">Санкт-Петербург →<br/>Москва →<br/>Адлер</span>
              </div>
              
              <div className="train-details-block__time-info">
                <div className="time-col">
                  <span className="time-col__time">09:52</span>
                  <span className="time-col__city">Санкт-Петербург</span>
                  <span className="time-col__station">Ладожский вокзал</span>
                </div>
                <div className="duration-col">
                  <img src={`${process.env.PUBLIC_URL}/images/arrow-right-yellow.png`} alt="arrow" style={{ transform: 'scaleX(-1)' }} />
                </div>
                <div className="time-col time-col--right">
                  <span className="time-col__time">00:10</span>
                  <span className="time-col__city">Москва</span>
                  <span className="time-col__station">Курский вокзал</span>
                </div>
              </div>

              <div className="train-details-block__duration-total">
                <img src={`${process.env.PUBLIC_URL}/images/clock-yellow.png`} alt="clock" />
                <div className="duration-total__text">
                  <span>9 часов</span>
                  <span>42 минуты</span>
                </div>
              </div>
            </div>

            <div className="ticket-quantity">
              <h3 className="ticket-quantity__title">Количество билетов</h3>
              <div className="ticket-quantity__wrapper">
                
                <div className="ticket-input-box">
                  <div className={`ticket-input-box__field ${activeInputReturn === 'adult' ? 'ticket-input-box__field--active' : ''}`}>
                    <label htmlFor="adult-ret">Взрослых —</label>
                    <input id="adult-ret" type="number" min="0" max="4" value={adultTickets} onChange={(e) => setAdultTickets(e.target.value === '' ? '' : Math.max(0, Math.min(4, parseInt(e.target.value))))} onFocus={() => setActiveInputReturn('adult')} onBlur={() => { setActiveInputReturn(null); if (adultTickets === '') setAdultTickets(0); }} />
                    <div className="ticket-input-box__controls">
                      <button type="button" className="ticket-btn ticket-btn--up" onClick={() => handleIncrement('adult')} disabled={adultTickets >= 4} />
                      <button type="button" className="ticket-btn ticket-btn--down" onClick={() => handleDecrement('adult')} disabled={adultTickets <= 0} />
                    </div>
                  </div>
                  <p className="ticket-input-box__desc">Можно добавить еще {Math.max(0, 4 - (adultTickets || 0))} пассажиров</p>
                </div>

                <div className="ticket-input-box">
                  <div className={`ticket-input-box__field ${activeInputReturn === 'child' ? 'ticket-input-box__field--active' : ''}`}>
                    <label htmlFor="child-ret">Детских —</label>
                    <input id="child-ret" type="number" min="0" max="3" value={childTickets} onChange={(e) => setChildTickets(e.target.value === '' ? '' : Math.max(0, Math.min(3, parseInt(e.target.value))))} onFocus={() => setActiveInputReturn('child')} onBlur={() => { setActiveInputReturn(null); if (childTickets === '') setChildTickets(0); }} />
                    <div className="ticket-input-box__controls">
                      <button type="button" className="ticket-btn ticket-btn--up" onClick={() => handleIncrement('child')} disabled={childTickets >= 3} />
                      <button type="button" className="ticket-btn ticket-btn--down" onClick={() => handleDecrement('child')} disabled={childTickets <= 0} />
                    </div>
                  </div>
                  <p className="ticket-input-box__desc">Можно добавить еще {Math.max(0, 3 - (childTickets || 0))} детей до 10 лет.</p>
                </div>

                <div className="ticket-input-box">
                  <div className={`ticket-input-box__field ${activeInputReturn === 'baby' ? 'ticket-input-box__field--active' : ''}`}>
                    <label htmlFor="baby-ret">Детских «без места» —</label>
                    <input id="baby-ret" type="number" min="0" max={adultTickets || 0} value={babyTickets} onChange={(e) => setBabyTickets(e.target.value === '' ? '' : Math.max(0, Math.min(adultTickets, parseInt(e.target.value))))} onFocus={() => setActiveInputReturn('baby')} onBlur={() => { setActiveInputReturn(null); if (babyTickets === '') setBabyTickets(0); }} />
                    <div className="ticket-input-box__controls">
                      <button type="button" className="ticket-btn ticket-btn--up" onClick={() => handleIncrement('baby')} disabled={babyTickets >= adultTickets} />
                      <button type="button" className="ticket-btn ticket-btn--down" onClick={() => handleDecrement('baby')} disabled={babyTickets <= 0} />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="wagon-types">
              <h3 className="wagon-types__title">Тип вагона</h3>
              <div className="wagon-types__list">
                <div className={`wagon-type-item ${activeWagonTypeReturn === 'seat' ? 'wagon-type-item--active' : ''}`} onClick={() => setActiveWagonTypeReturn('seat')}>
                  <img src={`${process.env.PUBLIC_URL}/images/seat.png`} alt="Сидячий" className="wagon-type-item__icon" />
                  <span className="wagon-type-item__label">Сидячий</span>
                </div>
                <div className={`wagon-type-item ${activeWagonTypeReturn === 'platzkart' ? 'wagon-type-item--active' : ''}`} onClick={() => setActiveWagonTypeReturn('platzkart')}>
                  <img src={`${process.env.PUBLIC_URL}/images/platzkart.png`} alt="Плацкарт" className="wagon-type-item__icon" />
                  <span className="wagon-type-item__label">Плацкарт</span>
                </div>
                <div className={`wagon-type-item ${activeWagonTypeReturn === 'coupe' ? 'wagon-type-item--active' : ''}`} onClick={() => setActiveWagonTypeReturn('coupe')}>
                  <img src={`${process.env.PUBLIC_URL}/images/cupe.png`} alt="Купе" className="wagon-type-item__icon" />
                  <span className="wagon-type-item__label">Купе</span>
                </div>
                <div className={`wagon-type-item ${activeWagonTypeReturn === 'lux' ? 'wagon-type-item--active' : ''}`} onClick={() => setActiveWagonTypeReturn('lux')}>
                  <img src={`${process.env.PUBLIC_URL}/images/lux.png`} alt="Люкс" className="wagon-type-item__icon" />
                  <span className="wagon-type-item__label">Люкс</span>
                </div>
              </div>
            </div>

            {status === 'success' && filteredReturn.length > 0 && (
              <div className="seats-page__carriages-list">
                {filteredReturn.map((coach) => (
                  <CarriageMap key={`${coach.coach._id}-ret`} coach={coach} totalTickets={totalTickets} trainType="return" />
                ))}
              </div>
            )}
          </div>

          <div className="seats-page__actions">
             <button 
                className={`seats-page__btn-next ${selectedSeats.length === 0 ? 'seats-page__btn-next--disabled' : ''}`}
                onClick={handleNextStep}
              >
                ДАЛЕЕ
             </button>
          </div>

        </section>
      </main>
    </div>
  );
};

export default SeatsPage;