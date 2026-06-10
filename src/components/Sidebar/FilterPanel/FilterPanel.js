import React from 'react';
import DateFilter from './DateFilter';
import OptionsFilter from './OptionsFilter';
import PriceFilter from './PriceFilter';
import TimeFilter from './TimeFilter';
import './FilterPanel.css';

const FilterPanel = () => {
  return (
    <div className="filter-panel">
      <DateFilter />
      <OptionsFilter />
      <PriceFilter />
      <TimeFilter direction="there" title="Туда" />
      <TimeFilter direction="back" title="Обратно" />
    </div>
  );
};

export default FilterPanel;