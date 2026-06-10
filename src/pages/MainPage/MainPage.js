import React from 'react';
import './MainPage.css';
import SearchForm from '../../components/SearchForm/SearchForm';

const MainPage = () => {
  return (
    <main className="main-page">
      <section className="hero" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero-bg.jpg)` }}>
        <div className="hero__content">
          <h1 className="hero__title">
            Вся жизнь - <br />
            <strong>путешествие!</strong>
          </h1>
          <div className="hero__form-container">
            <SearchForm isMainPage={true} />
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="container">
          <h2 className="section-title">О нас</h2>
          <div className="about__text-block">
            <p className="about__text">
              Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем все больше людей заказывают жд билеты через интернет.
            </p>
            <p className="about__text">
              Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать? Мы расскажем о преимуществах заказа через интернет.
            </p>
            <p className="about__text about__text--bold">
              <strong>Покупать жд билеты дешево можно за 90 суток до отправления поезда.<br/>
              Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/how-it-works-bg.png)` }}>
        <div className="container">
          <div className="how-it-works__header">
            <h2 className="section-title section-title--light">Как это работает</h2>
            <button className="how-it-works__btn">Узнать больше</button>
          </div>

          <div className="how-it-works__features">
            <div className="feature">
              <img 
                src={`${process.env.PUBLIC_URL}/images/monitor.png`} 
                alt="Удобный заказ" 
                className="feature__icon"
              />
              <p className="feature__text">Удобный заказ<br/>на сайте</p>
            </div>
            
            <div className="feature">
              <img 
                src={`${process.env.PUBLIC_URL}/images/building.png`} 
                alt="Нет необходимости ехать в офис" 
                className="feature__icon"
              />
              <p className="feature__text">Нет необходимости<br/>ехать в офис</p>
            </div>
            
            <div className="feature">
              <img 
                src={`${process.env.PUBLIC_URL}/images/globe.png`} 
                alt="Огромный выбор направлений" 
                className="feature__icon"
              />
              <p className="feature__text">Огромный выбор<br/>направлений</p>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews" id="reviews">
        <div className="container">
          <h2 className="section-title">Отзывы</h2>
          
           <div className="reviews__list">
            <div className="review">
              <img 
                src={`${process.env.PUBLIC_URL}/images/avatar-ekaterina.png`} 
                alt="Екатерина Вальнова" 
                className="review__avatar" 
              />
              <div className="review__content">
                <h4 className="review__name">Екатерина Вальнова</h4>
                <div className="review__quote-box">
                  <span className="quote-mark">“</span>
                  <p className="review__text">
                    Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.
                  </p>
                  <span className="quote-mark">”</span>
                </div>
              </div>
            </div>

            <div className="review">
              <img 
                src={`${process.env.PUBLIC_URL}/images/avatar-evgeny.png`} 
                alt="Евгений Стрыкало" 
                className="review__avatar" 
              />
              <div className="review__content">
                <h4 className="review__name">Евгений Стрыкало</h4>
                <div className="review__quote-box">
                  <span className="quote-mark">“</span>
                  <p className="review__text">
                    СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.
                  </p>
                  <span className="quote-mark">”</span>
                </div>
              </div>
            </div>
          </div>

          <div className="reviews__pagination">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </section>

    </main>
  );
};

export default MainPage;