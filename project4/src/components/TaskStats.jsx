import React from 'react';

/**
 * Requirement: Display pending and completed task counts
 */
export default function TaskStats({ total, pending, completed }) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="stats-container" aria-label="Task Summary Statistics">
      <div className="stat-card stat-total">
        <div className="stat-icon-wrapper icon-total">
          <i className="fa-solid fa-list-check"></i>
        </div>
        <div className="stat-info">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-value">{total}</span>
        </div>
      </div>

      <div className="stat-card stat-pending">
        <div className="stat-icon-wrapper icon-pending">
          <i className="fa-solid fa-clock-rotate-left"></i>
        </div>
        <div className="stat-info">
          <span className="stat-label">Pending Tasks</span>
          <span className="stat-value pending-text">{pending}</span>
        </div>
      </div>

      <div className="stat-card stat-completed">
        <div className="stat-icon-wrapper icon-completed">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <div className="stat-info">
          <span className="stat-label">Completed Tasks</span>
          <span className="stat-value completed-text">{completed}</span>
        </div>
      </div>

      <div className="stat-card stat-progress">
        <div className="progress-header">
          <span className="stat-label">Academic Progress</span>
          <span className="progress-percent">{percent}%</span>
        </div>
        <div className="progress-bar-track">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${percent}%` }}
            role="progressbar" 
            aria-valuenow={percent} 
            aria-valuemin="0" 
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </section>
  );
}
