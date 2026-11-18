import React from 'react';
import { useApplications } from '../context/ApplicationContext.jsx';
import ApplicationCard from './ApplicationCard.jsx';

export default function ApplicationList() {
  const { filteredApplications, statusFilter } = useApplications();

  if (filteredApplications.length === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-icon-wrap">
          <i className="fa-solid fa-briefcase"></i>
        </div>
        <h3>No Internship Applications Found</h3>
        <p>
          {statusFilter !== 'all' 
            ? `You currently have no applications under "${statusFilter}".` 
            : 'No applications match your search keyword. Click "Log New Internship Application" above to add your first record!'}
        </p>
      </div>
    );
  }

  return (
    <section className="applications-grid" aria-label="Internship Applications Grid">
      {filteredApplications.map(app => (
        <ApplicationCard key={app.id} app={app} />
      ))}
    </section>
  );
}
