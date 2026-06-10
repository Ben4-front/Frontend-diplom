import React from 'react';
import FilterPanel from './FilterPanel/FilterPanel';
import LastTickets from './LastTickets/LastTickets';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <FilterPanel />
      <LastTickets />
    </aside>
  );
};

export default Sidebar;