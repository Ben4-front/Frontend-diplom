import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSeats } from '../../store/slices/seatsSlice';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage = () => {
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.order);
  const { selectedSeats } = useSelector((state) => state.seats);
  const { passengers } = useSelector((state) => state.passengers);
  
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const [orderNumber] = useState(() => Math.floor(Math.random() * 1000) + 'АА');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleGoHome = () => {
  dispatch(clearSeats());
  navigate('/');
  };

  return (
    <>

      <main className="success-page">
        
        <section 
          className="success-page__hero"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero-bg-last.png)` }}
        >
          <div className="success-page__hero-container wrapper">
            <h1 className="success-page__title">Благодарим Вас за заказ!</h1>
          </div>
        </section>

        <section className="success-page__content">
          <div className="success-page__content-container wrapper">
            
            <div className="success-card">
              
              <div className="success-card__header">
                <h2 className="success-card__order-number">№Заказа {orderNumber}</h2>
                <div className="success-card__price-box">
                  <span className="success-card__price-label">сумма</span>
                  <span className="success-card__price-value">{totalPrice}</span>
                  <span className="success-card__price-currency">₽</span>
                </div>
              </div>

              <div className="success-card__instructions">
                <div className="success-card__instruction">
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/icon-email.png`} 
                    alt="Email" 
                    className="success-card__icon-img"
                  />
                  <p className="success-card__instruction-text">
                    билеты будут<br/>отправлены<br/>на ваш <strong>e-mail</strong>
                  </p>
                </div>

                <div className="success-card__instruction">
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/icon-tickets.png`} 
                    alt="Tickets" 
                    className="success-card__icon-img"
                  />
                  <p className="success-card__instruction-text">
                    <strong>распечатайте</strong><br/>и сохраняйте билеты<br/>до даты поездки
                  </p>
                </div>

                <div className="success-card__instruction">
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/icon-conductor.png`} 
                    alt="Conductor" 
                    className="success-card__icon-img"
                  />
                  <p className="success-card__instruction-text">
                    <strong>предъявите</strong><br/>распечатанные<br/>билеты при посадке
                  </p>
                </div>
              </div>

              <div className="success-card__message">
                <h3 className="success-card__user-name">
                  {user.firstName ? `${user.firstName} ${user.patronymic}!` : 'Уважаемый клиент!'}
                </h3>
                <p className="success-card__thank-text">
                  Ваш заказ успешно оформлен.<br/>
                  В ближайшее время с вами свяжется наш оператор для подтверждения.
                </p>
                <p className="success-card__wish-text">
                  <strong>Благодарим Вас за оказанное доверие и желаем приятного путешествия!</strong>
                </p>
              </div>

              <div className="success-card__footer">
                <div className="success-card__rating-box">
                  <span className="success-card__rating-label">Оцените сервис</span>
                  <div className="success-card__stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        className={`success-card__star ${star <= (hoverRating || rating) ? 'success-card__star--filled' : ''}`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.5 2.91669L22.19 12.425L32.6667 13.9563L25.0833 21.35L26.875 31.7917L17.5 26.8625L8.125 31.7917L9.91667 21.35L2.33333 13.9563L12.81 12.425L17.5 2.91669Z" stroke="white" strokeWidth="2" fill="transparent"/>
                      </svg>
                    ))}
                  </div>
                </div>

                <button className="success-page__btn" onClick={handleGoHome}>
                  ВЕРНУТЬСЯ НА ГЛАВНУЮ
                </button>
              </div>

            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default SuccessPage;