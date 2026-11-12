import React from 'react';

/**
 * Shows how many tasks are done along with a progress bar.
 *
 * @param {Object} props
 * @param {{all: number, pending: number, completed: number}} props.counts - Task counts
 */
const StatsBar = ({ counts }) => {
  // Avoid dividing by zero when there are no tasks yet
  const percent = counts.all === 0 ? 0 : Math.round((counts.completed / counts.all) * 100);

  return (
    <div className="stats">
      <div className="stats-text">
        <span>
          <strong>{counts.pending}</strong> pending
        </span>
        <span>
          <strong>{counts.completed}</strong> completed
        </span>
        <span className="stats-percent">{percent}% done</span>
      </div>
      <div className="progress" role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

export default StatsBar;