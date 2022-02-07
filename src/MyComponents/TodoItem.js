import React from 'react';

export const TodoItem = ({ todo, onDelete }) => {
  return (
    <>
      <div>
        <h4>{todo.title}</h4>
        <p>{todo.desc}</p>
        <button type="button" className="btn btn-sm btn-danger" onClick={() => { onDelete(todo) }}>Delete</button>
        <input className="form-check-input mx-1" type="checkbox" value="" />
        Done
      </div>
      <hr />
    </>
  );
};
