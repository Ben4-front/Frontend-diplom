import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrains, setFilter } from '../../store/slices/trainsSlice'; 

import Header from '../../components/Header/Header';
import SearchForm from '../../components/SearchForm/SearchForm';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import TrainCard from '../../components/TrainCard/TrainCard';
import Loader from '../../components/Loader/Loader';

import './TrainsPage.css';

const TrainsPage = () => {
  const dispatch = useDispatch();
  
  const { loading, items, totalCount, filters, error } = useSelector((state) => state.trains);

  const [sortOpen, setSortOpen] = useState(false);

  const sortMap = {
    'времени': 'date',
    'стоимости': 'price',
    'длительности': 'duration'
  };

  const currentSortLabel = Object.keys(sortMap).find(key => sortMap[key] === filters.sort) || 'времени';

  const handleSortChange = (ruLabel) => {
    dispatch(setFilter({ sort: sortMap[ruLabel] }));
    setSortOpen(false);
  };

  const handleLimitChange = (num) => {
    dispatch(setFilter({ limit: num }));
  };

  useEffect(() => {
    if (filters.from_city_id && filters.to_city_id) {
      dispatch(fetchTrains()); 
    }
  }, [dispatch, filters]); 

  const currentPage = Math.floor(filters.offset / filters.limit) + 1;
  const totalPages = Math.ceil(totalCount / filters.limit);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    const newOffset = (page - 1) * filters.limit;
    dispatch(setFilter({ offset: newOffset }));
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    }
    
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="trains-page">

      <section className="trains-page__hero" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/header-bg-blurred.png)` }}>
        <div className="trains-container">
          <SearchForm isMainPage={false} />
        </div>
      </section>

      {loading ? (
        <Loader />
      ) : (
        <>
          <ProgressBar currentStep={1} />
          
          <main className="trains-page__main">
            <div className="trains-container trains-page__layout">
              <aside className="trains-page__sidebar">
                <Sidebar />
              </aside>

              <section className="trains-page__content">
                
                {error && <h2 style={{color: 'red', textAlign: 'center'}}>{error}</h2>}

                <div className="trains-page__sort-header">
                  <span className="sort-header__count">найдено {totalCount}</span>
                  
                  <div className="sort-header__controls">
                    <div className="sort-dropdown">
                      <span className="sort-dropdown__label">сортировать по:</span>
                      <div className="sort-dropdown__select" onClick={() => setSortOpen(!sortOpen)}>
                        <span className="sort-dropdown__current">{currentSortLabel}</span>
                        {sortOpen && (
                          <ul className="sort-dropdown__list">
                            {Object.keys(sortMap).map((opt) => (
                              <li 
                                key={opt} 
                                className="sort-dropdown__item"
                                onClick={(e) => { e.stopPropagation(); handleSortChange(opt); }}
                              >
                                {opt}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <span className="sort-item">
                      показывать по: 
                      {[5, 10, 20].map(num => (
                        <span 
                          key={num}
                          className={`sort-item__value ${filters.limit === num ? 'sort-item__value--active' : ''}`}
                          onClick={() => handleLimitChange(num)}
                          style={{cursor: 'pointer', marginLeft: '10px'}}
                        >
                          {num}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>

                <div className="trains-page__train-list">
                  {items && items.length > 0 ? (
                    items.map((trainObj) => (
                      <TrainCard key={trainObj.departure._id} train={trainObj} />
                    ))
                  ) : (
                    !error && (
                      <h2 style={{textAlign: 'center', marginTop: '50px', color: '#928f94'}}>
                        По вашим фильтрам билетов не найдено 😔
                      </h2>
                    )
                  )}
                </div>

                {totalPages > 1 && (
                  <div className="trains-page__pagination">
                    
                    <button 
                      className="page-btn page-btn--arrow" 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'default' : 'pointer' }}
                    >
                      {'<'}
                    </button>

                    {pageNumbers.map((page, index) => {
                      if (page === '...') {
                        return <span key={`dots-${index}`} className="page-dots">...</span>;
                      }

                      return (
                        <button 
                          key={page}
                          className={`page-btn ${currentPage === page ? 'active' : ''}`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button 
                      className="page-btn page-btn--arrow" 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'default' : 'pointer' }}
                    >
                      {'>'}
                    </button>

                  </div>
                )}
                
              </section>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default TrainsPage;