import React from 'react';

export default function TaskFilter({ 
  filterStatus, 
  setFilterStatus, 
  searchQuery, 
  setSearchQuery, 
  courseFilter, 
  setCourseFilter,
  totalCount,
  onResetDefaults
}) {
  return (
    <section className="filter-bar" aria-label="Task Filters">
      <div className="filter-controls">
        {/* Status Tabs */}
        <div className="status-tabs" role="tablist">
          <button 
            className={`tab-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
            role="tab"
          >
            All Tasks
          </button>
          <button 
            className={`tab-btn ${filterStatus === 'pending' ? 'active' : ''}`}
            onClick={() => setFilterStatus('pending')}
            role="tab"
          >
            Pending
          </button>
          <button 
            className={`tab-btn ${filterStatus === 'completed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('completed')}
            role="tab"
          >
            Completed
          </button>
        </div>

        {/* Course Filter Dropdown */}
        <div className="filter-select-wrapper">
          <select 
            value={courseFilter} 
            onChange={(e) => setCourseFilter(e.target.value)}
            className="course-select"
            aria-label="Filter tasks by course"
          >
            <option value="all">All Courses</option>
            <option value="CS301 - Operating Systems">CS301 - Operating Systems</option>
            <option value="CS302 - DBMS">CS302 - DBMS</option>
            <option value="CS304 - Computer Networks">CS304 - Computer Networks</option>
            <option value="MATH204 - Linear Algebra">MATH204 - Linear Algebra</option>
            <option value="CS201 - Data Structures">CS201 - Data Structures</option>
            <option value="General Academic">General Academic</option>
            <option value="Project & Seminar">Project &amp; Seminar</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            type="text"
            placeholder="Search tasks by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search academic tasks"
          />
          {searchQuery && (
            <button 
              className="clear-search" 
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
      </div>

      <div className="filter-footer">
        <span className="results-badge">Showing {totalCount} tasks</span>
        <button className="btn-text-link" onClick={onResetDefaults} title="Reset to default sample tasks">
          <i className="fa-solid fa-rotate-left"></i> Reset Sample Data
        </button>
      </div>
    </section>
  );
}
