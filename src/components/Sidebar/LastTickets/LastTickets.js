import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './LastTickets.css';
import { WifiIcon, ExpressIcon, CupIcon } from '../../UI/Icons/Icons';

const LastTickets = () => {
  const dispatch = useDispatch();
  
  const lastTickets = [
    { _id: '1', departure: { city: 'Санкт-Петербург', station: 'Курский вокзал' }, arrival: { city: 'Самара', station: 'Московский вокзал' }, min_price: 2500, have_wifi: true, is_express: true },
    { _id: '2', departure: { city: 'Москва', station: 'Курский вокзал' }, arrival: { city: 'Казань', station: 'Московский вокзал' }, min_price: 3500, have_wifi: true, is_express: false }
  ];
  const isLoadingLastTickets = false;

  useEffect(() => {
  }, [dispatch]);

  if (isLoadingLastTickets) {
    return <div className="last-tickets__loading">Загрузка последних билетов...</div>;
  }

  return (
    <div className="sidebar__last-tickets last-tickets">
      <h3 className="last-tickets__title">ПОСЛЕДНИЕ БИЛЕТЫ</h3>
      <div className="last-tickets__list">
        
        {lastTickets.map((ticket) => (
          <div className="last-ticket-card" key={ticket._id}>
            <div className="last-ticket-card__header">
              <div className="last-ticket-card__city">
                <span className="last-ticket-card__city-name">{ticket.departure.city}</span>
                <span className="last-ticket-card__station">{ticket.departure.station}</span>
              </div>
              <div className="last-ticket-card__city last-ticket-card__city--right">
                <span className="last-ticket-card__city-name">{ticket.arrival.city}</span>
                <span className="last-ticket-card__station">{ticket.arrival.station}</span>
              </div>
            </div>
            
            <div className="last-ticket-card__footer">
              <div className="last-ticket-card__icons">
  {ticket.have_wifi && <WifiIcon className="last-tickets__feature-icon" />}
  {ticket.is_express && <ExpressIcon className="last-tickets__feature-icon" />}
  <CupIcon className="last-tickets__feature-icon" />
</div>
              <div className="last-ticket-card__price-wrapper">
                <span className="last-ticket-card__price-prefix">от</span>
                <span className="last-ticket-card__price">{ticket.min_price.toLocaleString('ru-RU')}</span>
                <span className="last-ticket-card__currency">₽</span>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default LastTickets;