import React from 'react';
import { FILTERS } from '../utils/constants';

/**
 * Buttons for switching between All / Pending / Completed tasks.
 *
 * @param {Object} props
 * @param {string} props.activeFilter - Currently selected filter value
 * @param {Function} props.onFilterChange - Called with the new filter value
 */
const FilterBar = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="filter-bar" role="group" aria-label="Filter tasks by status">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          className={`filter-btn ${activeFilter === filter.value ? 'filter-btn--active' : ''}`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
