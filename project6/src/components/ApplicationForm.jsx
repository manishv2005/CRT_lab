import React, { useState } from 'react';
import { useApplications } from '../context/ApplicationContext.jsx';

/**
 * Requirement 1: Add company and job details
 */
export default function ApplicationForm() {
  const { addApplication } = useApplications();
  const [isOpen, setIsOpen] = useState(false);

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [stipend, setStipend] = useState('');
  const [applyDate, setApplyDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState('Applied');
  const [jobUrl, setJobUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) {
      setError('Please provide both the Company Name and Job Role.');
      return;
    }

    addApplication({
      company: company.trim(),
      role: role.trim(),
      location: location.trim() || 'Remote / Flexible',
      stipend: stipend.trim() || 'Competitive',
      applyDate,
      status,
      jobUrl: jobUrl.trim(),
      notes: notes.trim()
    });

    // Reset Form
    setCompany('');
    setRole('');
    setLocation('');
    setStipend('');
    setStatus('Applied');
    setJobUrl('');
    setNotes('');
    setError('');
    setIsOpen(false);
  };

  return (
    <section className="form-section" aria-label="Add New Application Form">
      <div className="form-toggle-row">
        <button 
          className="btn btn-primary toggle-form-btn" 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
          {isOpen ? 'Close Application Form' : 'Log New Internship Application'}
        </button>
        <span className="form-toggle-hint">
          Keep your recruiter pipelines organized in one centralized dashboard.
        </span>
      </div>

      {isOpen && (
        <div className="form-card animate-slide-down">
          <div className="form-card-header">
            <h2><i className="fa-solid fa-file-circle-plus"></i> New Internship Record</h2>
            <span className="required-note">* Required Fields</span>
          </div>

          <form onSubmit={handleSubmit} className="app-form" noValidate>
            {error && <div className="form-error-banner"><i className="fa-solid fa-circle-exclamation"></i> {error}</div>}

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="company-name">Company Name <span className="req">*</span></label>
                <div className="input-wrap">
                  <i className="fa-solid fa-building input-icon"></i>
                  <input 
                    type="text" 
                    id="company-name" 
                    placeholder="e.g. Google, Spotify, Apple, Airbnb" 
                    value={company}
                    onChange={(e) => { setCompany(e.target.value); if (error) setError(''); }}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="job-role">Job Role / Position <span className="req">*</span></label>
                <div className="input-wrap">
                  <i className="fa-solid fa-id-badge input-icon"></i>
                  <input 
                    type="text" 
                    id="job-role" 
                    placeholder="e.g. Software Engineering Intern, ML Intern" 
                    value={role}
                    onChange={(e) => { setRole(e.target.value); if (error) setError(''); }}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-grid-3">
              <div className="form-group">
                <label htmlFor="job-location">Location / Work Type</label>
                <div className="input-wrap">
                  <i className="fa-solid fa-location-dot input-icon"></i>
                  <input 
                    type="text" 
                    id="job-location" 
                    placeholder="e.g. San Francisco, CA (Hybrid) or Remote" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="job-stipend">Estimated Stipend / Pay</label>
                <div className="input-wrap">
                  <i className="fa-solid fa-wallet input-icon"></i>
                  <input 
                    type="text" 
                    id="job-stipend" 
                    placeholder="e.g. $52/hr or $8,000/mo" 
                    value={stipend}
                    onChange={(e) => setStipend(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="apply-date">Date Applied</label>
                <div className="input-wrap">
                  <i className="fa-regular fa-calendar input-icon"></i>
                  <input 
                    type="date" 
                    id="apply-date" 
                    value={applyDate}
                    onChange={(e) => setApplyDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="app-status">Initial Application Status</label>
                <div className="input-wrap">
                  <i className="fa-solid fa-bars-progress input-icon"></i>
                  <select 
                    id="app-status" 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offered">Offered</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="job-url">Application / Portal Link</label>
                <div className="input-wrap">
                  <i className="fa-solid fa-link input-icon"></i>
                  <input 
                    type="url" 
                    id="job-url" 
                    placeholder="https://company.com/careers/job123" 
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="app-notes">Recruiter Notes / Interview Stages</label>
              <textarea 
                id="app-notes" 
                rows="2" 
                placeholder="Recruiter contact, interview dates, referral name, or OA prep..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            <div className="form-actions-row">
              <button type="submit" className="btn btn-primary">
                <i className="fa-solid fa-check"></i> Save Application
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
