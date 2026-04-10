import { useState, useEffect } from "react";

// STUDENT TODO: This API_URL works for local development
// For Docker, you may need to configure nginx proxy or use container networking
const API_URL = "http://103.1.236.26:8105";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_URL}/api/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const res = await fetch(`${API_URL}/api/todos`);
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    loadTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      await fetch(`${API_URL}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodo }),
      });
      setNewTodo("");
      fetchTodos();
    } catch (err) {
      alert("Failed to add todo", err.message);
    }
  };

  return (
    <div className="app-container">
      <h1>🚀 DevOps Todo App</h1>
      <p>Demo: Watch UI update LIVE after CI/CD! ✨</p>

      <div className="input-group">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
        />
        <button className="button" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span>{todo.title}</span>
            <small>{todo.completed ? "✅" : "⏳"}</small>
          </li>
        ))}
      </ul>

      <div className="footer">
        <p>
          <strong>STUDENT TODO:</strong>
        </p>
        <ul>
          <li>Dockerfile (multi-stage)</li>
          <li>Fix backend validation</li>
          <li>CI/CD pipeline</li>
          <li>REPORT.md + Slides</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
