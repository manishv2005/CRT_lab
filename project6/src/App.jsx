import React from 'react';
import { ApplicationProvider } from './context/ApplicationContext.jsx';
import AppHeader from './components/AppHeader.jsx';
import ApplicationStats from './components/ApplicationStats.jsx';
import ApplicationForm from './components/ApplicationForm.jsx';
import ApplicationFilter from './components/ApplicationFilter.jsx';
import ApplicationList from './components/ApplicationList.jsx';

export default function App() {
  return (
    <ApplicationProvider>
      <div className="app-container">
        <AppHeader />
        <ApplicationStats />
        <ApplicationForm />
        <ApplicationFilter />
        <ApplicationList />
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} CareerTrack &bull; Student Internship Application Tracker powered by React Context API.</p>
        </footer>
      </div>
    </ApplicationProvider>
  );
}
