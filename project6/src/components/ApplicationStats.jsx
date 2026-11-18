import React from 'react';
import { useApplications } from '../context/ApplicationContext.jsx';

export default function ApplicationStats() {
  const { stats } = useApplications();

  return (
    <section className="stats-grid" aria-label="Internship Application Statistics">
      <div className="kpi-card card-total">
        <div className="kpi-icon icon-total"><i className="fa-solid fa-folder-open"></i></div>
        <div className="kpi-info">
          <span className="kpi-label">Total Applied</span>
          <span className="kpi-value">{stats.total}</span>
        </div>
      </div>

      <div className="kpi-card card-interviewing">
        <div className="kpi-icon icon-interviewing"><i className="fa-solid fa-comments"></i></div>
        <div className="kpi-info">
          <span className="kpi-label">Interviewing</span>
          <span className="kpi-value text-interviewing">{stats.interviewing}</span>
        </div>
      </div>

      <div className="kpi-card card-offered">
        <div className="kpi-icon icon-offered"><i className="fa-solid fa-award"></i></div>
        <div className="kpi-info">
          <span className="kpi-label">Offers Received</span>
          <span className="kpi-value text-offered">{stats.offered}</span>
        </div>
      </div>

      <div className="kpi-card card-rate">
        <div className="kpi-icon icon-rate"><i className="fa-solid fa-chart-line"></i></div>
        <div className="kpi-info">
          <span className="kpi-label">Interview / Offer Rate</span>
          <span className="kpi-value text-rate">{stats.successRate}%</span>
        </div>
      </div>
    </section>
  );
}
