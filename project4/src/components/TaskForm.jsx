import React, { useState } from 'react';

/**
 * Requirement: Add new tasks
 */
export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('General Academic');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a task title or description.');
      return;
    }

    onAddTask({
      title: title.trim(),
      course,
      priority,
      dueDate: dueDate || new Date().toISOString().split('T')[0]
    });

    // Reset form
    setTitle('');
    setCourse('General Academic');
    setPriority('Medium');
    setDueDate('');
    setError('');
  };

  return (
    <section className="form-card" aria-label="Add New Task Form">
      <div className="card-heading">
        <i className="fa-solid fa-circle-plus"></i>
        <h2>Add Academic Task</h2>
      </div>

      <form onSubmit={handleSubmit} className="task-form" noValidate>
        <div className="form-group">
          <label htmlFor="task-title">Task Description / Assignment Title <span className="req">*</span></label>
          <div className="input-with-icon">
            <i className="fa-solid fa-pen-nib input-icon"></i>
            <input
              type="text"
              id="task-title"
              placeholder="e.g. Read Chapters 3-4, Submit Lab Record, Prepare for Midterm Quiz..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              className={error ? 'input-error' : ''}
            />
          </div>
          {error && <span className="error-msg">{error}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="task-course">Course / Subject</label>
            <div className="input-with-icon">
              <i className="fa-solid fa-book-bookmark input-icon"></i>
              <select 
                id="task-course" 
                value={course} 
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="General Academic">General Academic</option>
                <option value="CS301 - Operating Systems">CS301 - Operating Systems</option>
                <option value="CS302 - DBMS">CS302 - DBMS</option>
                <option value="CS304 - Computer Networks">CS304 - Computer Networks</option>
                <option value="MATH204 - Linear Algebra">MATH204 - Linear Algebra</option>
                <option value="CS201 - Data Structures">CS201 - Data Structures</option>
                <option value="Project & Seminar">Project &amp; Seminar</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="task-priority">Priority Level</label>
            <div className="input-with-icon">
              <i className="fa-solid fa-flag input-icon"></i>
              <select 
                id="task-priority" 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="task-due-date">Due Date</label>
            <div className="input-with-icon">
              <i className="fa-regular fa-calendar input-icon"></i>
              <input
                type="date"
                id="task-due-date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary add-task-btn">
          <i className="fa-solid fa-plus"></i> Add Academic Task
        </button>
      </form>
    </section>
  );
}
