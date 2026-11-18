import React from 'react';
import { useApplications } from '../context/ApplicationContext.jsx';

/**
 * Requirement 4: Search and filter applications
 */
export default function ApplicationFilter() {
  const { 
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter, 
    sortBy, 
    setSortBy, 
    filteredApplications, 
    applications,
    resetDefaultData 
  } = useApplications();

  const statuses = ['all', 'Applied', 'Under Review', 'Interviewing', 'Offered', 'Rejected'];

  return (
    <section className="filter-panel" aria-label="Search and Filter Controls">
      <div className="filter-top-row">
        
        {/* Search Input */}
        <div className="search-wrapper">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input 
            type="text" 
            placeholder="Search by company name, role, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search applications"
          />
          {searchQuery && (
            <button 
              className="clear-search-btn" 
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="sort-wrapper">
          <label htmlFor="sort-select"><i className="fa-solid fa-arrow-down-wide-short"></i> Sort:</label>
          <select 
            id="sort-select" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="company">Company (A-Z)</option>
          </select>
        </div>

      </div>

      {/* Status Tabs Bar */}
      <div className="status-tabs-row" role="tablist">
        <span className="tabs-label">Filter Status:</span>
        {statuses.map(st => (
          <button 
            key={st}
            className={`tab-btn ${statusFilter === st ? 'active' : ''}`}
            onClick={() => setStatusFilter(st)}
            role="tab"
          >
            {st === 'all' ? 'All Applications' : st}
          </button>
        ))}
      </div>

      <div className="filter-summary-row">
        <span className="count-tag">
          Showing <strong>{filteredApplications.length}</strong> of <strong>{applications.length}</strong> applications
        </span>
        <button className="reset-data-btn" onClick={resetDefaultData} title="Reset to sample dataset">
          <i className="fa-solid fa-rotate-left"></i> Reset Sample Data
        </button>
      </div>
    </section>
  );
}
