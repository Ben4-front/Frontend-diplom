import React from 'react';
import { HashRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './pages/MainPage/MainPage';
import './index.css';
import TrainsPage from './pages/TrainsPage/TrainsPage';
import SeatsPage from './pages/SeatsPage/SeatsPage';
import PassengersPage from './pages/PassengersPage/PassengersPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import OrderPage from './pages/OrderPage/OrderPage';
import SuccessPage from './pages/SuccessPage/SuccessPage'


function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/trains" element={<TrainsPage />} />
            <Route path="/seats/:id" element={<SeatsPage />} />
            <Route path="/passengers" element={<PassengersPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;