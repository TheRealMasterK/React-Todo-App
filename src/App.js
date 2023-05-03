

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo(text) {
    setTodos([...todos, text]);
  }

  function removeTodo(index) {
    setTodos(todos.filter((todo, i) => i !== index));
  }

  function editTodo(text, index) {
    const newTodos = [...todos];
    newTodos[index] = text;
    setTodos(newTodos);
  }

  return (
    <div className='App'>
      <h1>Todo App</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTodo(event.target.elements.todo.value);
          event.target.elements.todo.value = '';
        }}
      >
        <input type='text' name='todo' />
        <button type='submit'>Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input type="text" value={todo} onChange={(event) => editTodo(event.target.value, index)}></input>
            {todo}
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
