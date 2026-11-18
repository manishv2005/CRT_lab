import React from 'react';

export default function AppHeader() {
  return (
    <header className="app-header">
      <div className="brand-group">
        <div className="brand-icon">
          <i className="fa-solid fa-briefcase"></i>
        </div>
        <div>
          <h1 className="brand-title">Career<span className="accent">Track</span></h1>
          <p className="brand-tagline">Student Internship Application &amp; Offer Management System</p>
        </div>
      </div>
      <div className="header-meta">
        <span className="context-api-badge">
          <i className="fa-brands fa-react"></i> Powered by React Context API
        </span>
      </div>
    </header>
  );
}
