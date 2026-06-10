import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { submitOrder } from '../../store/slices/orderSlice';

import TrainCard from '../../components/TrainCard/TrainCard'; 

import Header from '../../components/Header/Header';
import SearchForm from '../../components/SearchForm/SearchForm';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import OrderDetailsSidebar from '../../components/OrderDetailsSidebar/OrderDetailsSidebar';
import Footer from '../../components/Footer/Footer';

import './OrderPage.css';

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { passengers } = useSelector((state) => state.passengers);
  const { selectedSeats } = useSelector((state) => state.seats);
  const { payment, status, error } = useSelector((state) => state.order);
  
  const selectedTrain = useSelector((state) => state.trains.selectedTrain); 
  
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  useEffect(() => {
    if (passengers.length === 0) {
      navigate('/');
    }
  }, [passengers, navigate]);

  useEffect(() => {
    if (status === 'success') {
      navigate('/success');
    }
  }, [status, navigate]);

  const handleConfirm = () => {
    dispatch(submitOrder());
  };

  const formatBirthDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    if (day && month && year) {
      return `${day}.${month}.${year}`;
    }
    return dateStr;
  };

  return (
    <>

      
      <section 
        className="trains-page__hero" 
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/header-bg-blurred.png)` }}
      >
        <div className="trains-page__hero-wrapper wrapper">
          <SearchForm />
        </div>
      </section>

      <ProgressBar currentStep={4} />

      <section className="order-page">
        <div className="order-page__wrapper wrapper">
          
          <aside className="order-page__sidebar">
            <OrderDetailsSidebar />
          </aside>

          <main className="order-page__main">
            
            <section className="order-section">
              <div className="order-section__header">
                <h2 className="order-section__title">Поезд</h2>
              </div>
              <div className="order-section__body order-section__body--no-pad">
                
                {selectedTrain ? (
                  <TrainCard 
                    train={selectedTrain} 
                    customActionBtn={
                      <button 
                        className="order-btn-change order-btn-change--train" 
                        onClick={() => navigate('/trains')}
                      >
                        Изменить
                      </button>
                    }
                  />
                ) : (
                  <p className="order-empty-msg">
                    Данные о поезде не найдены. Пожалуйста, вернитесь к выбору поезда.
                  </p>
                )}

              </div>
            </section>

            <section className="order-section">
              <div className="order-section__header">
                <h2 className="order-section__title">Пассажиры</h2>
              </div>
              <div className="order-section__body order-section__body--split">
                
                <div className="order-split-left">
                  <div className="order-passengers-list">
                    {passengers.map((p) => (
                      <div key={p.id} className="order-passenger">
                        <div className="order-passenger__avatar-container">
                          <div className="order-passenger__avatar">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16 16C20.4183 16 24 12.4183 24 8C24 3.58172 20.4183 0 16 0C11.5817 0 8 3.58172 8 8C8 12.4183 11.5817 16 16 16ZM16 20C10.6667 20 0 22.6667 0 28V32H32V28C32 22.6667 21.3333 20 16 20Z" fill="white"/>
                            </svg>
                          </div>
                          <span className="order-passenger__type-text">
                            {p.type === 'adult' ? 'Взрослый' : 'Детский'}
                          </span>
                        </div>
                        
                        <div className="order-passenger__info">
                          <p className="order-passenger__name">
                            {p.lastName} {p.firstName} {p.patronymic}
                          </p>
                          <p className="order-passenger__doc">
                            Пол {p.gender === 'M' ? 'мужской' : 'женский'}
                            <br/>
                            Дата рождения {formatBirthDate(p.birthDate)}
                            <br/>
                            {p.documentType === 'passport' ? 'Паспорт РФ' : 'Свидетельство о рождении'} {p.documentNumber}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-split-right">
                  <div className="order-split-right__content">
                    <div className="order-total-price">
                      <span className="order-total-label">Всего</span>
                      <span className="order-total-value">
                        {totalPrice.toLocaleString('ru-RU')} <span className="order-total-currency">₽</span>
                      </span>
                    </div>
                    <button 
                      className="order-btn-change"
                      onClick={() => navigate('/passengers')}
                    >
                      Изменить
                    </button>
                  </div>
                </div>

              </div>
            </section>

            <section className="order-section">
              <div className="order-section__header">
                <h2 className="order-section__title">Способ оплаты</h2>
              </div>
              <div className="order-section__body order-section__body--split">
                
                <div className="order-split-left order-split-left--payment">
                  <p className="order-payment-text">
                    {payment?.method === 'cash' ? 'Наличными' : 'Онлайн'}
                  </p>
                </div>

                <div className="order-split-right">
                  <div className="order-split-right__content order-split-right__content--bottom">
                    <button 
                      className="order-btn-change"
                      onClick={() => navigate('/payment')}
                    >
                      Изменить
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {status === 'loading' && <h3 className="loading-text">Отправка заказа на сервер...</h3>}
            {status === 'error' && <h3 className="error-text">Ошибка при отправке: {error}</h3>}

            <div className="order-page__footer">
              <button 
                className="order-page__btn"
                onClick={handleConfirm}
                disabled={status === 'loading'}
              >
                Подтвердить
              </button>
            </div>

          </main>
        </div>
      </section>
    </>
  );
};

export default OrderPage;