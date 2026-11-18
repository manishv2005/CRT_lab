import React from 'react';
import { useApplications } from '../context/ApplicationContext.jsx';

/**
 * Requirements 2 & 3: Maintain and update application status
 */
export default function ApplicationCard({ app }) {
  const { updateStatus, deleteApplication } = useApplications();

  const getStatusClass = (st) => {
    switch (st) {
      case 'Applied': return 'status-applied';
      case 'Under Review': return 'status-review';
      case 'Interviewing': return 'status-interviewing';
      case 'Offered': return 'status-offered';
      case 'Rejected': return 'status-rejected';
      default: return 'status-default';
    }
  };

  const getStatusIcon = (st) => {
    switch (st) {
      case 'Applied': return 'fa-paper-plane';
      case 'Under Review': return 'fa-hourglass-half';
      case 'Interviewing': return 'fa-comments';
      case 'Offered': return 'fa-award';
      case 'Rejected': return 'fa-circle-xmark';
      default: return 'fa-tag';
    }
  };

  return (
    <article className={`app-card ${getStatusClass(app.status)}`} data-id={app.id}>
      <div className="card-top">
        <div className="company-info-block">
          <div className="company-avatar-box">
            {app.company.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="company-name">{app.company}</h3>
            <h4 className="role-title">{app.role}</h4>
          </div>
        </div>

        {/* Quick Status Dropdown to UPDATE STATUS in real-time */}
        <div className="status-updater-wrap">
          <label htmlFor={`status-${app.id}`} className="status-label">Update Status:</label>
          <div className="custom-select-wrap">
            <i className={`fa-solid ${getStatusIcon(app.status)} status-icon-prefix`}></i>
            <select 
              id={`status-${app.id}`}
              value={app.status}
              onChange={(e) => updateStatus(app.id, e.target.value)}
              className={`status-select ${getStatusClass(app.status)}`}
              aria-label={`Update application status for ${app.company}`}
            >
              <option value="Applied">Applied</option>
              <option value="Under Review">Under Review</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offered">Offered</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card-meta-grid">
        <div className="meta-item">
          <i className="fa-solid fa-location-dot"></i>
          <span>{app.location}</span>
        </div>
        <div className="meta-item">
          <i className="fa-solid fa-wallet"></i>
          <span>{app.stipend}</span>
        </div>
        <div className="meta-item">
          <i className="fa-regular fa-calendar-check"></i>
          <span>Applied: {app.applyDate}</span>
        </div>
      </div>

      {app.notes && (
        <div className="card-notes-box">
          <i className="fa-regular fa-note-sticky"></i>
          <p>{app.notes}</p>
        </div>
      )}

      <div className="card-footer-row">
        {app.jobUrl ? (
          <a 
            href={app.jobUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-outline btn-sm job-link-btn"
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i> Career Portal
          </a>
        ) : <span className="no-link">No link saved</span>}

        <button 
          className="delete-app-btn"
          onClick={() => deleteApplication(app.id)}
          title="Delete record"
          aria-label={`Delete application for ${app.company}`}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </article>
  );
}
