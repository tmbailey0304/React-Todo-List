import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem.length === 0) return;
    setTodos(currentTodos => {
      return [...todos,
      { id: crypto.randomUUID(),
        name: newItem,
        completed: false,
      }]
    })
    setNewItem("");
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed}
        }
        return todo;
      })
    })
  }

  function handleDelete(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input type='text' id='item' value={newItem} onChange={(e) => setNewItem(e.target.value)}></input>
        </div>
        <button className='btn'>Add Item</button>
      </form>
      <h1>Todo List</h1>
      <ul className='list'>
        {
          todos.map((todo) => {
            return (
            <li key={todo.id}>
              <label>
                <input type="checkbox"
                  onChange={e => toggleTodo(todo.id, e.target.checked)}
                  checked={todo.completed}>
                </input>
                {todo.name}
              </label>
              <button onClick={() => handleDelete(todo.id)} className='btn btn-danger'>Delete</button>
            </li>)
          })
        }
      </ul>
    </>

  )
}

export default App;
