import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Подписка оформлена на: ${email}`);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { id: 'youtube', icon: 'youtube.png', url: '#' },
    { id: 'linkedin', icon: 'linkedin.png', url: '#' },
    { id: 'google', icon: 'google.png', url: '#' },
    { id: 'facebook', icon: 'facebook.png', url: '#' },
    { id: 'twitter', icon: 'twitter.png', url: '#' },
  ];

  return (
    <footer className="footer" id="contacts">
      <div className="footer__top">
        {/* Контакты */}
        <div className="footer__contacts">
          <h3 className="footer__title">Свяжитесь с нами</h3>
          <ul className="footer__contacts-list">
            <li className="footer__contacts-item">
              <img src={`${process.env.PUBLIC_URL}/images/phone.png`} alt="Телефон" className="footer__icon" />
              <a href="tel:88000000000" className="footer__contacts-link">8 (800) 000 00 00</a>
            </li>
            <li className="footer__contacts-item">
              <img src={`${process.env.PUBLIC_URL}/images/mail.png`} alt="Email" className="footer__icon" />
              <a href="mailto:inbox@mail.ru" className="footer__contacts-link">inbox@mail.ru</a>
            </li>
            <li className="footer__contacts-item">
              <img src={`${process.env.PUBLIC_URL}/images/skype.png`} alt="Skype" className="footer__icon" />
              <a href="skype:tu.train.tickets?call" className="footer__contacts-link">tu.train.tickets</a>
            </li>
            <li className="footer__contacts-item">
              <img src={`${process.env.PUBLIC_URL}/images/pin.png`} alt="Адрес" className="footer__icon" />
              <span className="footer__contacts-text">г. Москва, ул. Московская 27-35<br/>555 555</span>
            </li>
          </ul>
        </div>

        <div className="footer__subscribe">
          <h3 className="footer__title">Подписка</h3>
          <form className="footer__form" onSubmit={handleSubscribe}>
            <p className="footer__form-text">Будьте в курсе событий</p>
            <div className="footer__form-group">
              <input
                type="email"
                className="footer__input"
                placeholder="e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="footer__btn">ОТПРАВИТЬ</button>
            </div>
          </form>

          <div className="footer__socials">
            <h3 className="footer__title">Подписывайтесь на нас</h3>
            <ul className="footer__socials-list">
              {socialLinks.map((social) => (
                <li key={social.id} className="footer__socials-item">
                  <a href={social.url} className="footer__social-link" target="_blank" rel="noopener noreferrer">
                    <img 
                      src={`${process.env.PUBLIC_URL}/images/${social.icon}`} 
                      alt={social.id} 
                      className="footer__social-img" 
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__logo">Лого</div>
        <button className="footer__scroll-up" onClick={scrollToTop} aria-label="Наверх">
          <img src={`${process.env.PUBLIC_URL}/images/arrow-up.png`} alt="Наверх" onError={(e) => e.target.style.display='none'} />
          <span className="arrow-text">↑</span>
        </button>
        <div className="footer__copyright">2018 WEB</div>
      </div>
    </footer>
  );
};

export default Footer;