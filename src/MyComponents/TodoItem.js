import React from 'react';

export const TodoItem = ({ todo, onDelete }) => (
  <section className="mb-3">
    <h4>{todo.title}</h4>
    <p>{todo.desc}</p>
    <div className="d-flex align-items-center">
      <button
        type="button"
        className="btn btn-sm btn-danger me-2"
        onClick={() => onDelete(todo)}
      >
        Delete
      </button>
      <input
        className="form-check-input mx-1"
        type="checkbox"
        aria-label="Mark as done"
      />
      <label className="form-check-label ms-1">Done</label>
    </div>
    <hr />
  </section>
);
