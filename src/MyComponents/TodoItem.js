import React, { useState } from "react";

const TodoItem = ({ todo, onToggleDone, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleEditSave = () => {
    if (
      (editTitle.trim() !== "" && editTitle !== todo.title) ||
      (editDescription.trim() !== "" && editDescription !== todo.description)
    ) {
      onEdit(todo, editTitle, editDescription);
    }
    setIsEditing(false);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggleDone(todo)}
          className="me-2"
        />
        {isEditing ? (
          <>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="me-2"
              autoFocus
              placeholder="Title"
            />
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="me-2"
              placeholder="Description"
            />
            <button
              className="btn btn-sm btn-success me-2"
              onClick={handleEditSave}
            >
              Save
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
            <strong>{todo.title}</strong>
            <br />
            <small>{todo.description}</small>
          </span>
        )}
      </div>
      <div>
        {!isEditing && (
          <button
            className="btn btn-sm btn-primary me-2"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this todo?")) {
              onDelete(todo);
            }
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
