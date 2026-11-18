import React from 'react';
import TaskItem from './TaskItem.jsx';

/**
 * Requirement: Render tasks dynamically using React components
 */
export default function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-tasks-card">
        <div className="empty-icon">
          <i className="fa-solid fa-clipboard-list"></i>
        </div>
        <h3>No Academic Tasks Found</h3>
        <p>You have no tasks matching this filter. Add a new assignment above to stay organized!</p>
      </div>
    );
  }

  return (
    <section className="task-list" aria-label="Academic Tasks List">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </section>
  );
}
