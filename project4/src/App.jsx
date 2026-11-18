import React, { useState, useEffect, useMemo } from 'react';
import TaskHeader from './components/TaskHeader.jsx';
import TaskStats from './components/TaskStats.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskFilter from './components/TaskFilter.jsx';
import TaskList from './components/TaskList.jsx';

const INITIAL_TASKS = [
  {
    id: "task-1",
    title: "Complete Operating Systems Lab Assignment 4 (Semaphore & Mutex)",
    course: "CS301 - Operating Systems",
    priority: "High",
    dueDate: "2026-11-20",
    completed: false,
    createdAt: "2026-11-16"
  },
  {
    id: "task-2",
    title: "Review Linear Algebra Chapter 5: Eigenvalues & Matrix Decomposition",
    course: "MATH204 - Linear Algebra",
    priority: "Medium",
    dueDate: "2026-11-21",
    completed: true,
    createdAt: "2026-11-15"
  },
  {
    id: "task-3",
    title: "Submit Computer Networks Project Report on TCP vs UDP Latency",
    course: "CS304 - Computer Networks",
    priority: "High",
    dueDate: "2026-11-22",
    completed: false,
    createdAt: "2026-11-17"
  },
  {
    id: "task-4",
    title: "Prepare Slide Deck for Database Management Systems Seminar",
    course: "CS302 - DBMS",
    priority: "Medium",
    dueDate: "2026-11-24",
    completed: false,
    createdAt: "2026-11-17"
  },
  {
    id: "task-5",
    title: "Solve Practice Problems on Dynamic Programming & Graphs",
    course: "CS201 - Data Structures",
    priority: "Low",
    dueDate: "2026-11-25",
    completed: true,
    createdAt: "2026-11-14"
  }
];

export default function App() {
  // Retrieve stored tasks from localStorage or use initial set
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem('academic_tasks_data');
      return stored ? JSON.parse(stored) : INITIAL_TASKS;
    } catch (e) {
      return INITIAL_TASKS;
    }
  });

  // Filter States
  const [filterStatus, setFilterStatus] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('academic_tasks_data', JSON.stringify(tasks));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [tasks]);

  // Requirement 1: Add new tasks
  const handleAddTask = (newTaskData) => {
    const newTask = {
      id: 'task-' + Date.now(),
      ...newTaskData,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks(prev => [newTask, ...prev]);
  };

  // Requirement 2: Mark tasks as completed
  const handleToggleComplete = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
  };

  // Requirement 3: Delete tasks
  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Reset to default dataset
  const handleResetDefaults = () => {
    setTasks(INITIAL_TASKS);
    setFilterStatus('all');
    setCourseFilter('all');
    setSearchQuery('');
  };

  // Requirement 4: Display pending and completed task counts
  const counts = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    return { total, pending, completed };
  }, [tasks]);

  // Filter tasks dynamically
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filterStatus === 'pending' && task.completed) return false;
      if (filterStatus === 'completed' && !task.completed) return false;

      if (courseFilter !== 'all' && task.course !== courseFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = task.title.toLowerCase().includes(q);
        const matchCourse = task.course.toLowerCase().includes(q);
        if (!matchTitle && !matchCourse) return false;
      }

      return true;
    });
  }, [tasks, filterStatus, courseFilter, searchQuery]);

  return (
    <div className="app-layout">
      <div className="container app-container">
        {/* Header */}
        <TaskHeader />

        {/* Pending & Completed Task Counts */}
        <TaskStats 
          total={counts.total} 
          pending={counts.pending} 
          completed={counts.completed} 
        />

        {/* Add Task Form */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Filter & Search Bar */}
        <TaskFilter 
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          courseFilter={courseFilter}
          setCourseFilter={setCourseFilter}
          totalCount={filteredTasks.length}
          onResetDefaults={handleResetDefaults}
        />

        {/* Dynamic React Task List */}
        <TaskList 
          tasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
        />

        {/* Footer */}
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} EduTask Planner &bull; Academic Task Management System built with React Components.</p>
        </footer>
      </div>
    </div>
  );
}
