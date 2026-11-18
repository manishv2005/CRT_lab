import React from 'react';

export default function TaskHeader() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-icon">
          <i className="fa-solid fa-graduation-cap"></i>
        </div>
        <div>
          <h1 className="brand-title">EduTask <span className="highlight">Planner</span></h1>
          <p className="brand-subtitle">Student Academic Task &amp; Assignment Manager</p>
        </div>
      </div>
      <div className="header-date">
        <i className="fa-regular fa-calendar-check"></i>
        <span>{today}</span>
      </div>
    </header>
  );
}
