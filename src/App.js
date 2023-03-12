import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  // Define the todos state and setTodos function using the useState hook
  const [todos, setTodos] = useState([]);

  // Read todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    // Check if there are todos in local storage before setting the todos state
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  // Persist todos to local storage when the todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Function to add a new todo to the list
  function addTodo(text) {
    // Update the todos state by creating a new array with the spread operator and concatenating the new text
    setTodos([...todos, text]);
  }

  // Function to remove a todo from the list
  function removeTodo(index) {
    // Update the todos state by filtering out the todo with the specified index
    setTodos(todos.filter((todo, i) => i !== index));
  }

  // Function to edit a todo in the list
  function editTodo(text, index) {
    // Create a new copy of the todos state using the spread operator
    const newTodos = [...todos];
    // Update the todo at the specified index with the new text
    newTodos[index] = text;
    // Update the todos state with the new array
    setTodos(newTodos);
  }

  // Render the Todo App
  return (
    <div className='App'>
      <h1>Todo App</h1>
      {/* Form to add a new todo */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          // Call the addTodo function with the value of the todo input field
          addTodo(event.target.elements.todo.value);
          // Clear the input field
          event.target.elements.todo.value = '';
        }}
      >
        <input type='text' name='todo' />
        <button type='submit'>Add Todo</button>
      </form>
      {/* List of todos */}
      <ul>
        {/* Map over the todos array and render each todo as a list item */}
        {todos.map((todo, index) => (
          <li key={index}>
            {/* Input field to edit the todo */}
            <input type="text" value={todo} onChange={(event) => editTodo(event.target.value, index)}></input>
            {/* Display the todo text */}
            {todo}
            {/* Button to remove the todo */}
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
