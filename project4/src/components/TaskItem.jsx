import React from 'react';

/**
 * Requirements:
 * - Mark tasks as completed
 * - Delete tasks
 */
export default function TaskItem({ task, onToggleComplete, onDeleteTask }) {
  const priorityClass = task.priority.toLowerCase();

  return (
    <article className={`task-card ${task.completed ? 'task-completed' : ''}`}>
      {/* Complete Toggle Checkbox */}
      <button 
        className={`checkbox-btn ${task.completed ? 'checked' : ''}`}
        onClick={() => onToggleComplete(task.id)}
        title={task.completed ? "Mark as Pending" : "Mark as Completed"}
        aria-label={`Toggle task completion for: ${task.title}`}
      >
        {task.completed ? (
          <i className="fa-solid fa-circle-check check-icon"></i>
        ) : (
          <i className="fa-regular fa-circle uncheck-icon"></i>
        )}
      </button>

      {/* Task Info Content */}
      <div className="task-content">
        <div className="task-header-tags">
          <span className="course-pill">
            <i className="fa-solid fa-bookmark"></i> {task.course}
          </span>
          <span className={`priority-pill priority-${priorityClass}`}>
            <i className="fa-solid fa-flag"></i> {task.priority}
          </span>
        </div>

        <h3 className={`task-title ${task.completed ? 'strikethrough' : ''}`}>
          {task.title}
        </h3>

        <div className="task-meta">
          <span className="due-date">
            <i className="fa-regular fa-calendar"></i> Due: {task.dueDate || 'Flexible'}
          </span>
          {task.completed && (
            <span className="completed-badge">
              <i className="fa-solid fa-check"></i> Completed
            </span>
          )}
        </div>
      </div>

      {/* Delete Action Button */}
      <div className="task-actions">
        <button 
          className="delete-btn" 
          onClick={() => onDeleteTask(task.id)}
          title="Delete task"
          aria-label={`Delete task: ${task.title}`}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </article>
  );
}
