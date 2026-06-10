import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initPassengers, addPassenger } from '../../store/slices/passengersSlice';

import Header from '../../components/Header/Header';
import SearchForm from '../../components/SearchForm/SearchForm';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import OrderDetailsSidebar from '../../components/OrderDetailsSidebar/OrderDetailsSidebar';
import PassengerForm from '../../components/PassengerForm/PassengerForm';
import Footer from '../../components/Footer/Footer';

import './PassengersPage.css';

const PassengersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const selectedSeats = useSelector((state) => state.seats.selectedSeats);
  const passengers = useSelector((state) => state.passengers.passengers);

  useEffect(() => {
    if (selectedSeats.length === 0) {
      navigate('/trains', { replace: true });
      return;
    }
    
    const outboundCount = selectedSeats.filter(s => s.trainType === 'outbound').length;
    const returnCount = selectedSeats.filter(s => s.trainType === 'return').length;
    const seatsCount = Math.max(outboundCount, returnCount);

    if (passengers.length === 0) {
      dispatch(initPassengers(seatsCount));
    }
  }, [dispatch, selectedSeats, navigate, passengers.length]);

  const isAllValid = passengers.length > 0 && passengers.every((p) => p.isValid);

  const handleNextStep = () => {
    if (!isAllValid) return; 
    navigate('/payment');
  };

  const handleAddPassenger = () => {
    dispatch(addPassenger());
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

      <ProgressBar currentStep={2} />

      <section className="passengers-page">
        <div className="passengers-page__wrapper wrapper">
          
          <aside className="passengers-page__sidebar">
            <OrderDetailsSidebar />
          </aside>

          <main className="passengers-page__main">
            <div className="passengers-page__forms">
              {passengers.map((p, index) => (
                <PassengerForm 
                  key={p.id} 
                  id={p.id} 
                  number={index + 1} 
                />
              ))}
            </div>

            <div className="passengers-page__add-block" onClick={handleAddPassenger}>
              <span className="passengers-page__add-text">Добавить пассажира</span>
              <span className="passengers-page__add-icon">+</span>
            </div>

            <div className="passengers-page__footer">
              <button 
                className={`passengers-page__next-btn ${!isAllValid ? 'passengers-page__next-btn--disabled' : ''}`}
                onClick={handleNextStep}
                disabled={!isAllValid} 
              >
                Далее
              </button>
            </div>
          </main>
          
        </div>
      </section>
    </>
  );
};

export default PassengersPage;