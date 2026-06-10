import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSeat } from '../../store/slices/seatsSlice';
import './CarriageMap.css';


const CarriageMap = ({ coach, totalTickets, trainType }) => {
  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) => state.seats.selectedSeats);

  const { 
    _id, 
    name, 
    class_type, 
    bottom_price, 
    top_price, 
    have_wifi, 
    have_air_conditioning 
  } = coach.coach;
  
  const seatsList = coach.seats;
  const wagonNumber = name.replace(/\D/g, '') || '07';

  // Проверка, выбрано ли место в ЭТОМ направлении
  const isSelected = (seatIndex) => {
    return selectedSeats.some(
      (s) => s.coachId === _id && s.seatNumber === seatIndex && s.trainType === trainType
    );
  };


  const carriageTotalPrice = selectedSeats
    .filter((s) => s.coachId === _id && s.trainType === trainType)
    .reduce((sum, s) => sum + s.price, 0);

  const selectedInThisDirection = selectedSeats.filter(s => s.trainType === trainType);

  const handleSeatClick = (seatIndex, isAvailable, price) => {
    if (!isAvailable) return;

    const isAlreadySelected = isSelected(seatIndex);

    if (!isAlreadySelected && selectedInThisDirection.length >= totalTickets) {
      alert(`Вы указали ${totalTickets} пассажира(ов). Вы не можете выбрать больше мест в этом поезде!`);
      return; 
    }

    dispatch(toggleSeat({ coachId: _id, seatNumber: seatIndex, price, trainType }));
  };

  const renderSeatBtn = (seatIndex) => {
    const seatInfo = seatsList.find((s) => s.index === seatIndex);
    const isAvailable = seatInfo ? seatInfo.available : false;
    const selected = isSelected(seatIndex); 

    const price = seatIndex % 2 === 0 ? top_price : bottom_price;

    let btnClass = 'carriage__seat-btn';
    if (!isAvailable) btnClass += ' carriage__seat-btn--taken';
    else if (selected) btnClass += ' carriage__seat-btn--selected';
    else btnClass += ' carriage__seat-btn--available';

    return (
      <button
        key={seatIndex}
        className={btnClass}
        onClick={() => handleSeatClick(seatIndex, isAvailable, price)}
        disabled={!isAvailable}
      >
        {seatIndex}
      </button>
    );
  };

  // 1. РЕНДЕР КУПЕ
  const renderCoupeSeats = () => {
    const compartments = [];
    for (let i = 0; i < 8; i++) {
      const startSeat = i * 4 + 1;
      compartments.push(
        <div key={`coupe-comp-${i}`} className="carriage__compartment">
          <div className="carriage__compartment-top">
            {renderSeatBtn(startSeat + 1)}
            {renderSeatBtn(startSeat + 3)}
          </div>
          <div className="carriage__compartment-bottom">
            {renderSeatBtn(startSeat)}
            {renderSeatBtn(startSeat + 2)}
          </div>
        </div>
      );
    }
    return <div className="carriage__seats-layout coupe-layout">{compartments}</div>;
  };

  const renderPlatzkartSeats = () => {
    const compartments = [];
    for (let i = 0; i < 8; i++) {
      const mainStart = i * 4 + 1;
      const sideStart = 32 + i * 2 + 1;
      compartments.push(
        <div key={`platzkart-comp-${i}`} className="carriage__platzkart-compartment">
          <div className="carriage__platzkart-main">
            <div className="carriage__compartment-top">
              {renderSeatBtn(mainStart + 1)}
              {renderSeatBtn(mainStart + 3)}
            </div>
            <div className="carriage__compartment-bottom">
              {renderSeatBtn(mainStart)}
              {renderSeatBtn(mainStart + 2)}
            </div>
          </div>
          <div className="carriage__platzkart-side">
            <div className="carriage__compartment-bottom">
              {renderSeatBtn(sideStart)}
            </div>
            <div className="carriage__compartment-top">
              {renderSeatBtn(sideStart + 1)}
            </div>
          </div>
        </div>
      );
    }
    return <div className="carriage__seats-layout platzkart-layout">{compartments}</div>;
  };

  const renderLuxSeats = () => {
    const compartments = [];
    const offsets = [131, 190, 278, 369, 455, 547, 635, 728, 781];

    for (let i = 0; i < 9; i++) {
      const startSeat = i * 2 + 1;
      const renderPlace = (seatNumber) => {
        if (seatNumber === 2 || seatNumber === 17) {
          return (
            <div key={`hidden-${seatNumber}`} style={{ visibility: 'hidden', width: '28px', height: '28px' }}>
              {renderSeatBtn(seatNumber)}
            </div>
          );
        }
        return renderSeatBtn(seatNumber);
      };

      compartments.push(
        <div key={`lux-comp-${i}`} className="carriage__lux-compartment" style={{ left: `${offsets[i]}px` }}>
          <div className="carriage__lux-compartment-bottom">
            {renderPlace(startSeat)}     
            {renderPlace(startSeat + 1)} 
          </div>
        </div>
      );
    }
    return <div className="carriage__seats-layout lux-layout">{compartments}</div>;
  };

  const renderSeatedSeats = () => {
    const topHalfCols = [];
    const bottomHalfCols = [];
    const renderEmpty = () => <div style={{ width: '28px', height: '28px' }}></div>; 
    const topOffsets = [143, 186, 228, 273, 317, 362, 404, 366, 491, 537, 576, 623, 671, 715, 759, 801];
    const bottomOffsets = [140, 185, 230, 274, 321, 314, 404, 448, 495, 537, 580, 624, 670, 714, 758, 805];

    for (let i = 0; i < 16; i++) {
      const topSeatTop = i * 2 + 2;    
      const topSeatBottom = i * 2 + 1; 
      
      topHalfCols.push(
        <div key={`seat-top-${i}`} className="seated-col" style={{ left: `${topOffsets[i]}px` }}>
          {renderSeatBtn(topSeatTop)}
          {renderSeatBtn(topSeatBottom)}
        </div>
      );

      let botSeatTop = null;
      let botSeatBottom = null;

      if (i === 0) {
        botSeatBottom = 33;
      } else if (i === 15) {
        botSeatBottom = 62;
      } else {
        botSeatTop = 32 + i * 2;     
        botSeatBottom = 33 + i * 2;  
      }

      bottomHalfCols.push(
        <div key={`seat-bot-${i}`} className="seated-col" style={{ left: `${bottomOffsets[i]}px` }}>
          {botSeatTop ? renderSeatBtn(botSeatTop) : renderEmpty()}
          {botSeatBottom ? renderSeatBtn(botSeatBottom) : renderEmpty()}
        </div>
      );
    }
    return (
      <div className="carriage__seats-layout seated-layout">
        <div className="seated-half top-half">{topHalfCols}</div>
        <div className="seated-half bottom-half">{bottomHalfCols}</div>
      </div>
    );
  };

  return (
    <div className="carriage">
      <div className="carriage__nav">
        <div className="carriage__nav-tabs">
          <span className="carriage__nav-label">Вагоны</span>
          <button className="carriage__nav-btn carriage__nav-btn--active">{wagonNumber}</button>
          <button className="carriage__nav-btn">09</button> 
        </div>
        <div className="carriage__nav-hint">
          Нумерация вагонов начинается с головы поезда
        </div>
      </div>

      <div className="carriage__info-block">
        <div className="carriage__number-box">
          <span className="carriage__number-val">{wagonNumber}</span>
          <span className="carriage__number-text">вагон</span>
        </div>

        <div className="carriage__details">
          <div className="carriage__details-col">
            <span className="carriage__details-title">Места <span>{seatsList.length}</span></span>
            <div className="carriage__price-row">
              <span className="carriage__price-label">Верхние <span></span></span>
              <span className="carriage__price-val">{top_price} <span className="ruble">₽</span></span>
            </div>
            <div className="carriage__price-row">
              <span className="carriage__price-label">Нижние <span></span></span>
              <span className="carriage__price-val">{bottom_price} <span className="ruble">₽</span></span>
            </div>
          </div>

          <div className="carriage__facilities">
            <span className="carriage__details-title carriage__details-title--right">Обслуживание ФПК</span>
            <div className="carriage__icons">
              
              <div className="carriage__icon-wrapper">
                <div className={`carriage__icon ${have_air_conditioning ? 'carriage__icon--active' : ''}`}>
                  <img src={`${process.env.PUBLIC_URL}/images/icon-snow.png`} alt="Кондиционер" />
                </div>
                <div className="carriage__tooltip">кондиционер</div>
              </div>

              <div className="carriage__icon-wrapper">
                <div className={`carriage__icon ${have_wifi ? 'carriage__icon--active' : ''}`}>
                  <img src={`${process.env.PUBLIC_URL}/images/icon-wifi.png`} alt="WiFi" />
                </div>
                <div className="carriage__tooltip">WI-FI</div>
              </div>

              <div className="carriage__icon-wrapper">
                <div className="carriage__icon carriage__icon--active">
                  <img src={`${process.env.PUBLIC_URL}/images/icon-linens.png`} alt="Белье" />
                </div>
                <div className="carriage__tooltip">белье</div>
              </div>

              <div className="carriage__icon-wrapper">
                <div className="carriage__icon">
                  <img src={`${process.env.PUBLIC_URL}/images/icon-cup.png`} alt="Питание" />
                </div>
                <div className="carriage__tooltip">питание</div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="carriage__map-wrapper">
        <div className="carriage__people-count">
          11 человек выбирают<br/>места в этом поезде
        </div>
        
        {class_type === 'second' && (
          <div className="carriage__image-wrapper" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/carriage-kupe.png)` }}>
             {renderCoupeSeats()}
          </div>
        )}
        {class_type === 'third' && (
          <div className="carriage__image-wrapper" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/carriage-platzkart.png)` }}>
             {renderPlatzkartSeats()}
          </div>
        )}
        {class_type === 'first' && (
          <div className="carriage__image-wrapper" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/carriage-lux.png)` }}>
             {renderLuxSeats()}
          </div>
        )}
        {class_type === 'fourth' && (
          <div className="carriage__image-wrapper" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/carriage-seat.png)` }}>
             {renderSeatedSeats()}
          </div>
        )}

        {carriageTotalPrice > 0 && (
          <div className="carriage__total-price">
            {carriageTotalPrice.toLocaleString('ru-RU')} <span className="ruble-grey">₽</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarriageMap;