import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserField, setPaymentMethod, validateOrderForm } from '../../store/slices/orderSlice';

import Header from '../../components/Header/Header';
import SearchForm from '../../components/SearchForm/SearchForm';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import OrderDetailsSidebar from '../../components/OrderDetailsSidebar/OrderDetailsSidebar';
import Footer from '../../components/Footer/Footer';

import './PaymentPage.css';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, payment, isValid } = useSelector((state) => state.order);
  const passengers = useSelector((state) => state.passengers.passengers);

  useEffect(() => {
    dispatch(validateOrderForm());
  }, [user, payment.method, dispatch]);

  useEffect(() => {
    if (passengers.length === 0) {
      navigate('/');
    }
  }, [passengers, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateUserField({ field: name, value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!isValid) {
      alert('Пожалуйста, заполните корректно все поля!');
      return;
    }
    navigate('/order'); 
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

      <ProgressBar currentStep={3} />

      <section className="payment-page">
        <div className="payment-page__wrapper wrapper">
          
          <aside className="payment-page__sidebar">
            <OrderDetailsSidebar />
          </aside>

          <main className="payment-page__main">
            
            <div className="payment-card">
              <div className="payment-card__header">
                <h2 className="payment-card__title">Персональные данные</h2>
              </div>
              
              <div className="payment-card__body">
                <div className="payment-form__row">
                  <div className="payment-form__group">
                    <label>Фамилия</label>
                    <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
                  </div>
                  <div className="payment-form__group">
                    <label>Имя</label>
                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
                  </div>
                  <div className="payment-form__group">
                    <label>Отчество</label>
                    <input type="text" name="patronymic" value={user.patronymic} onChange={handleChange} />
                  </div>
                </div>

                <div className="payment-form__row payment-form__row--margin">
                  <div className="payment-form__group payment-form__group--small">
                    <label>Контактный телефон</label>
                    <input type="tel" name="phone" value={user.phone} onChange={handleChange} placeholder="+7 ___ ___ __ __" />
                  </div>
                </div>

                <div className="payment-form__row payment-form__row--margin">
                  <div className="payment-form__group payment-form__group--small">
                    <label>E-mail</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="example@mail.ru" />
                  </div>
                </div>
              </div>

              <div className="payment-card__divider"></div>

              <div className="payment-card__header">
                <h2 className="payment-card__title">Способ оплаты</h2>
              </div>
              
              <div className="payment-card__body">
                <div className="payment-method">
                  <label className="payment-method__label">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="online" 
                      checked={payment.method === 'online'}
                      onChange={() => dispatch(setPaymentMethod('online'))} 
                      className="payment-method__input"
                    />
                    <span className="payment-method__custom-checkbox"></span>
                    <span className="payment-method__text">Онлайн</span>
                  </label>
                  <div className="payment-method__sub-options">
                    <span>Банковской картой</span>
                    <span>PayPal</span>
                    <span>Visa QIWI Wallet</span>
                  </div>
                </div>

                <div className="payment-card__divider payment-card__divider--inner"></div>

                <div className="payment-method">
                  <label className="payment-method__label">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="cash" 
                      checked={payment.method === 'cash'}
                      onChange={() => dispatch(setPaymentMethod('cash'))} 
                      className="payment-method__input"
                    />
                    <span className="payment-method__custom-checkbox"></span>
                    <span className="payment-method__text">Наличными</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="payment-page__footer">
              <button 
                className={`payment-page__btn ${!isValid ? 'payment-page__btn--disabled' : ''}`}
                onClick={handleNextStep}
                disabled={!isValid}
              >
                Купить билеты
              </button>
            </div>

          </main>
        </div>
      </section>
    </>
  );
};

export default PaymentPage;