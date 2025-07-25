import React from 'react';
import TodoItem from "./TodoItem";

export const Todos = ({ todos, onDelete, onToggleDone, onEdit }) => {
  const myStyle = { margin: "20px auto" };

  return (
    <div className="container" style={myStyle}>
      <h3 className="my-3">Todos List</h3>
      {todos.length === 0
        ? <p>No todos to display. You have no tasks left.</p>
        : todos.map(todo =>
            <TodoItem
              todo={todo}
              key={todo.sno}
              onDelete={onDelete}
              onToggleDone={onToggleDone}
              onEdit={onEdit}
            />
          )
      }
    </div>
  )
}
