import React, { useState } from "react";

const TodoItem = ({ todo, onToggleDone, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [showConfirmModal, setShowConfirmModal] = useState(false);


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
    <div className={`todo-item ${todo.done ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggleDone(todo)}
        className="todo-checkbox"
      />

      <div className="todo-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="form-control mb-2"
              autoFocus
              placeholder="Title"
            />
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="form-control mb-2"
              placeholder="Description"
            />
            <div className="edit-actions">
              <button
                className="btn btn-success btn-sm"
                onClick={handleEditSave}
              >
                Save
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div
              className={`todo-title ${
                todo.done ? "text-decoration-line-through" : ""
              }`}
            >
              {todo.title}
            </div>
            <div className="todo-description">{todo.description}</div>
          </div>
        )}
      </div>

      <div className="todo-actions">
  {!isEditing && (
    <button
      className="btn btn-primary btn-sm"
      onClick={() => setIsEditing(true)}
    >
      Edit
    </button>
  )}
  <button
    type="button"
    className="btn btn-danger btn-sm"
    onClick={() => setShowConfirmModal(true)}  // ✅ This opens the modal
  >
    Delete
  </button>

  {/* Modal */}
  {showConfirmModal && (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowConfirmModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this todo?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                onDelete(todo);
                setShowConfirmModal(false);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

    </div>
  );
};

export default TodoItem;
