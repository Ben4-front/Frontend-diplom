import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassenger, removePassenger } from '../../store/slices/passengersSlice';
import './PassengerForm.css';

const PassengerForm = ({ id, number }) => {
  const dispatch = useDispatch();
  const passenger = useSelector((state) => 
    state.passengers.passengers.find((p) => p.id === id)
  );

  const [isOpen, setIsOpen] = useState(number === 1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!passenger) return null; 

  const nameRegex = /^[А-Яа-яA-Za-z\- ]+$/; 
  const birthCertRegex = /^[IVXLCDM]{1,4}[-\s]?[А-Яа-я]{2}[-\s]?\d{6}$/i;

  const docValue = passenger.documentNumber || '';
  const passportSeries = passenger.documentType === 'passport' ? docValue.slice(0, 4) : '';
  const passportNumber = passenger.documentType === 'passport' ? docValue.slice(4, 10) : docValue;

  const handleChange = (field, value) => {
    dispatch(updatePassenger({ id, field, value }));
  };

  const getErrors = () => {
    const errors = {};
    if (!passenger.lastName || !nameRegex.test(passenger.lastName)) errors.lastName = true;
    if (!passenger.firstName || !nameRegex.test(passenger.firstName)) errors.firstName = true;
    if (!passenger.birthDate) errors.birthDate = true;

    if (passenger.documentType === 'passport') {
      if (docValue.replace(/\D/g, '').length !== 10) errors.document = 'Номер паспорта указан некорректно. Пример: 1234 567890';
    } else {
      if (!birthCertRegex.test(docValue)) errors.document = 'Номер свидетельства о рождении указан некорректно. Пример: VIII-АЯ-123456';
    }
    return errors;
  };

  const errors = getErrors();
  const hasErrors = Object.keys(errors).length > 0;

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (!hasErrors) {
      dispatch(updatePassenger({ id, isValid: true }));
      setIsOpen(false); 
    } else {
      dispatch(updatePassenger({ id, isValid: false }));
    }
  };

  const handlePassportSeries = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    handleChange('documentNumber', val + passportNumber);
  };

  const handlePassportNumber = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    handleChange('documentNumber', passportSeries + val);
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm('Вы уверены, что хотите удалить этого пассажира?');
    if (isConfirmed) {
      dispatch(removePassenger(id));
    }
  };

  return (
    <div className="passenger-form">
      <div className={`passenger-form__header ${isOpen ? 'passenger-form__header--active' : ''}`}>
        <div className="passenger-form__header-left" onClick={() => setIsOpen(!isOpen)}>
          <button type="button" className="passenger-form__toggle-btn">
            {isOpen ? '—' : '+'}
          </button>
          <h3 className="passenger-form__title">Пассажир {number}</h3>
        </div>
        
        <button 
          type="button" 
          className="passenger-form__delete" 
          onClick={handleDelete}
          title="Удалить пассажира"
        >
          ✖
        </button>
      </div>

      {isOpen && (
        <div className="passenger-form__body">
          <div className="passenger-form__row">
            <select 
              value={passenger.type || 'adult'}
              onChange={(e) => handleChange('type', e.target.value)} 
              className="passenger-form__select passenger-form__select--small"
            >
              <option value="adult">Взрослый</option>
              <option value="child">Детский</option>
            </select>
          </div>

          <div className="passenger-form__row passenger-form__row--grid-3">
            <div className="passenger-form__input-group">
              <label>Фамилия</label>
              <input 
                type="text" 
                value={passenger.lastName} 
                onChange={(e) => handleChange('lastName', e.target.value)} 
                className={isSubmitted && errors.lastName ? 'input-error' : ''}
              />
            </div>
            <div className="passenger-form__input-group">
              <label>Имя</label>
              <input 
                type="text" 
                value={passenger.firstName} 
                onChange={(e) => handleChange('firstName', e.target.value)}
                className={isSubmitted && errors.firstName ? 'input-error' : ''}
              />
            </div>
            <div className="passenger-form__input-group">
              <label>Отчество</label>
              <input 
                type="text" 
                value={passenger.patronymic} 
                onChange={(e) => handleChange('patronymic', e.target.value)} 
              />
            </div>
          </div>

          <div className="passenger-form__row passenger-form__row--grid-2">
            <div className="passenger-form__input-group">
              <label>Пол</label>
              <div className="passenger-form__gender-toggle">
                <button 
                  type="button" 
                  className={`gender-btn ${passenger.gender === 'M' ? 'active' : ''}`}
                  onClick={() => handleChange('gender', 'M')}
                >М</button>
                <button 
                  type="button" 
                  className={`gender-btn ${passenger.gender === 'F' ? 'active' : ''}`}
                  onClick={() => handleChange('gender', 'F')}
                >Ж</button>
              </div>
            </div>
            <div className="passenger-form__input-group">
              <label>Дата рождения</label>
              <input 
                type="date" 
                value={passenger.birthDate} 
                onChange={(e) => handleChange('birthDate', e.target.value)} 
                className={isSubmitted && errors.birthDate ? 'input-error' : ''}
              />
            </div>
          </div>

          <div className="passenger-form__row">
            <label className="passenger-form__checkbox-label">
              <input type="checkbox" />
              <span className="custom-checkbox"></span>
              ограниченная подвижность
            </label>
          </div>

          <div className="passenger-form__divider"></div>

          <div className="passenger-form__row passenger-form__row--docs">
            <div className="passenger-form__input-group doc-type">
              <label>Тип документа</label>
              <select 
                value={passenger.documentType} 
                onChange={(e) => {
                  handleChange('documentType', e.target.value);
                  handleChange('documentNumber', ''); 
                }}
                className="passenger-form__select"
              >
                <option value="passport">Паспорт РФ</option>
                <option value="birthCert">Свидетельство о рождении</option>
              </select>
            </div>

            {passenger.documentType === 'passport' ? (
              <>
                <div className="passenger-form__input-group doc-series">
                  <label>Серия</label>
                  <input 
                    type="text" 
                    value={passportSeries} 
                    onChange={handlePassportSeries} 
                    placeholder="_ _ _ _"
                    className={isSubmitted && errors.document ? 'input-error' : ''}
                  />
                </div>
                <div className="passenger-form__input-group doc-number">
                  <label>Номер</label>
                  <input 
                    type="text" 
                    value={passportNumber} 
                    onChange={handlePassportNumber} 
                    placeholder="_ _ _ _ _ _"
                    className={isSubmitted && errors.document ? 'input-error' : ''}
                  />
                </div>
              </>
            ) : (
              <div className="passenger-form__input-group doc-number-full">
                <label>Номер</label>
                <input 
                  type="text" 
                  value={docValue} 
                  onChange={(e) => handleChange('documentNumber', e.target.value)} 
                  placeholder="12 символов"
                  className={isSubmitted && errors.document ? 'input-error' : ''}
                />
              </div>
            )}
          </div>

          <div className="passenger-form__footer-actions">
            {isSubmitted && hasErrors && (
              <div className="passenger-form__error-banner">
                <span className="error-icon">✖</span>
                {errors.document ? errors.document : 'Некоторые поля заполнены некорректно. Проверьте выделенные красным.'}
              </div>
            )}
            
            {isSubmitted && !hasErrors && (
              <div className="passenger-form__success-banner">
                <span className="success-icon">✔</span>
                Готово
              </div>
            )}

            <button 
              type="button" 
              className="passenger-form__next-btn"
              onClick={handleSubmit}
            >
              Следующий пассажир
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default PassengerForm;