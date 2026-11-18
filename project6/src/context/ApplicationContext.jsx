import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const INITIAL_APPLICATIONS = [
  {
    id: "app-1",
    company: "Google",
    role: "Software Engineering Intern - Summer 2027",
    location: "Mountain View, CA (Hybrid)",
    stipend: "$55/hr",
    applyDate: "2026-11-05",
    status: "Interviewing",
    jobUrl: "https://careers.google.com/students/",
    notes: "Passed technical phone screen. Virtual on-site scheduled for next Tuesday."
  },
  {
    id: "app-2",
    company: "Microsoft",
    role: "Cloud & DevOps Engineering Intern",
    location: "Redmond, WA (On-site)",
    stipend: "$52/hr",
    applyDate: "2026-11-08",
    status: "Offered",
    jobUrl: "https://careers.microsoft.com/students",
    notes: "Offer letter received! Stipend: $52/hr + housing stipend. Deadline to accept: Dec 1."
  },
  {
    id: "app-3",
    company: "Amazon",
    role: "Frontend Developer Intern",
    location: "Seattle, WA (Hybrid)",
    stipend: "$50/hr",
    applyDate: "2026-11-10",
    status: "Under Review",
    jobUrl: "https://amazon.jobs/en/teams/internships-for-students",
    notes: "Completed Online Assessment (OA2). Awaiting recruiter feedback."
  },
  {
    id: "app-4",
    company: "Meta",
    role: "Machine Learning & AI Research Intern",
    location: "Menlo Park, CA (Hybrid)",
    stipend: "$58/hr",
    applyDate: "2026-11-12",
    status: "Applied",
    jobUrl: "https://www.metacareers.com/students",
    notes: "Applied via campus referral with resume tailored to PyTorch and NLP."
  },
  {
    id: "app-5",
    company: "Stripe",
    role: "Backend Infrastructure Intern",
    location: "San Francisco, CA (Remote)",
    stipend: "$56/hr",
    applyDate: "2026-10-28",
    status: "Interviewing",
    jobUrl: "https://stripe.com/jobs/university",
    notes: "Round 2 technical coding interview completed. Distributed systems design round next."
  },
  {
    id: "app-6",
    company: "Netflix",
    role: "Data Engineering Intern",
    location: "Los Gatos, CA (On-site)",
    stipend: "$60/hr",
    applyDate: "2026-10-20",
    status: "Rejected",
    jobUrl: "https://jobs.netflix.com/",
    notes: "Role closed early due to high volume. Encouraged to reapply next season."
  }
];

export const ApplicationContext = createContext(null);

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('internship_applications_record');
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch (e) {
      return INITIAL_APPLICATIONS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    try {
      localStorage.setItem('internship_applications_record', JSON.stringify(applications));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [applications]);

  // Requirement 1: Add company and job details
  const addApplication = (newApp) => {
    const item = {
      id: 'app-' + Date.now(),
      ...newApp,
      applyDate: newApp.applyDate || new Date().toISOString().split('T')[0]
    };
    setApplications(prev => [item, ...prev]);
  };

  // Requirement 2 & 3: Maintain and update application status
  const updateStatus = (id, newStatus) => {
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        return { ...app, status: newStatus };
      }
      return app;
    }));
  };

  // Delete application
  const deleteApplication = (id) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  // Reset default data
  const resetDefaultData = () => {
    setApplications(INITIAL_APPLICATIONS);
    setSearchQuery('');
    setStatusFilter('all');
    setSortBy('newest');
  };

  // Summary statistics
  const stats = useMemo(() => {
    const total = applications.length;
    const applied = applications.filter(a => a.status === 'Applied').length;
    const underReview = applications.filter(a => a.status === 'Under Review').length;
    const interviewing = applications.filter(a => a.status === 'Interviewing').length;
    const offered = applications.filter(a => a.status === 'Offered').length;
    const rejected = applications.filter(a => a.status === 'Rejected').length;
    const successRate = total > 0 ? Math.round(((interviewing + offered) / total) * 100) : 0;

    return { total, applied, underReview, interviewing, offered, rejected, successRate };
  }, [applications]);

  // Requirement 4: Search and filter applications
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const query = searchQuery.trim().toLowerCase();
      const matchCompany = app.company.toLowerCase().includes(query);
      const matchRole = app.role.toLowerCase().includes(query);
      const matchLocation = app.location.toLowerCase().includes(query);
      const matchesSearch = query === '' || matchCompany || matchRole || matchLocation;

      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.applyDate) - new Date(a.applyDate);
      if (sortBy === 'oldest') return new Date(a.applyDate) - new Date(b.applyDate);
      if (sortBy === 'company') return a.company.localeCompare(b.company);
      return 0;
    });
  }, [applications, searchQuery, statusFilter, sortBy]);

  const value = {
    applications,
    filteredApplications,
    stats,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    addApplication,
    updateStatus,
    deleteApplication,
    resetDefaultData
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
}
