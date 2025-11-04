import React from 'react';

const Todo = ({ todo, toggle, remove }) => (
  <div>
    <input type="checkbox" checked={todo.done} 
                            onChange={() => toggle(todo.id)} />
    <span style={{ textDecoration: todo.done ? 'line-through' : '' }}>
        {todo.text}
    </span>
    <button onClick={() => remove(todo.id)}>❌</button>
  </div>
);

export default Todo;
