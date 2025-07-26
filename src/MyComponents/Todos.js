import React from 'react';
import TodoItem from "./TodoItem";

export const Todos = ({ todos, onDelete, onToggleDone, onEdit, loading = false }) => {
  if (loading) {
    return (
      <div className="todo-container">
        <div className="todo-list">
          <div className="text-center">
            <div className="spinner"></div>
            <p>Loading your todos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-container">
      <div className="todo-list">
        <h3>Your Todos</h3>
        {todos.length === 0 ? (
          <div className="text-center">
            <p>No todos yet. Create your first task!</p>
          </div>
        ) : (
          todos.map(todo => (
            <TodoItem
              todo={todo}
              key={todo.id}
              onDelete={onDelete}
              onToggleDone={onToggleDone}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};
