import React, { useState } from 'react';
import Todo from './Todo';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const add = () => {
    if (text) setTodos([...todos, { id: Date.now(), text, done: false }]);
    setText('');
  };

  const toggle = id => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const remove = id => setTodos(todos.filter(t => t.id !== id));

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Add todo" />
      <button onClick={add}>Add</button>
      {todos.map(t => <Todo key={t.id} todo={t} toggle={toggle} remove={remove} />)}
    </div>
  );
};

export default TodoList;
