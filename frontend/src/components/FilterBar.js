import React from 'react';
import { FILTERS } from '../utils/constants';

/**
 * Buttons for switching between All / Pending / Completed tasks.
 *
 * @param {Object} props
 * @param {string} props.activeFilter - Currently selected filter value
 * @param {Function} props.onFilterChange - Called with the new filter value
 * @param {{all: number, pending: number, completed: number}} props.counts - Number of tasks per filter
 */
const FilterBar = ({ activeFilter, onFilterChange, counts }) => {
  return (
    <div className="filter-bar" role="group" aria-label="Filter tasks by status">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          className={`filter-btn ${activeFilter === filter.value ? 'filter-btn--active' : ''}`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
          <span className="filter-count">{counts[filter.value]}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterBar;