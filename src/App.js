import React, { useState, useEffect, useCallback } from "react";
import { Header } from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { Footer } from "./MyComponents/Footer";
import { AddTodo } from "./MyComponents/AddTodo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { About } from "./MyComponents/About";
import { Login } from "./MyComponents/Login";
import { Register } from "./MyComponents/Register";
import apiService from "./services/api";
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(apiService.getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [todosLoading, setTodosLoading] = useState(false);

  const handleLogin = (userData, token) => {
    setUser(userData);
  };

  const handleLogout = () => {
    apiService.logout();
    setUser(null);
    setTodos([]);
  };

  const loadTodos = useCallback(async () => {
    if (!user) return;
    
    setTodosLoading(true);
    try {
      const todosData = await apiService.getTodos();
      setTodos(todosData);
    } catch (error) {
      console.error('Failed to load todos:', error);
      alert('Failed to load todos. Please try again.');
    } finally {
      setTodosLoading(false);
    }
  }, [user]);

  const addTodo = async (title, desc) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const newTodo = await apiService.createTodo({ title, description: desc });
      setTodos(prevTodos => [newTodo, ...prevTodos]);
    } catch (error) {
      console.error('Failed to add todo:', error);
      alert('Failed to add todo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (todo) => {
    if (!user) return;
    
    try {
      await apiService.deleteTodo(todo.id);
      setTodos(prevTodos => prevTodos.filter(t => t.id !== todo.id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
      alert('Failed to delete todo. Please try again.');
    }
  };

  const handleToggleDone = async (todoToToggle) => {
    if (!user) return;
    
    try {
      const updatedTodo = await apiService.toggleTodo(todoToToggle.id);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === todoToToggle.id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      alert('Failed to toggle todo. Please try again.');
    }
  };

  const handleEdit = async (todoToEdit, newTitle, newDescription) => {
    if (!user) return;
    
    try {
      const updatedTodo = await apiService.updateTodo(todoToEdit.id, {
        title: newTitle,
        description: newDescription
      });
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === todoToEdit.id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error('Failed to update todo:', error);
      alert('Failed to update todo. Please try again.');
    }
  };

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  return (
    <Router>
      <div className={darkMode ? "dark-mode App d-flex flex-column min-vh-100" : "App d-flex flex-column min-vh-100"}>
        <Header 
          title="Todos List" 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          user={user}
          onLogout={handleLogout}
        />
        <main className="flex-grow-1">
          <Switch>
            <Route exact path="/">
              {user ? (
                <>
                  <AddTodo addTodo={addTodo} loading={loading} />
                  <Todos
                    todos={todos}
                    onDelete={onDelete}
                    onToggleDone={handleToggleDone}
                    onEdit={handleEdit}
                    loading={todosLoading}
                  />
                </>
              ) : (
                <div className="welcome-screen">
                  <h3>Welcome to Todos List</h3>
                  <p>Organize your tasks and boost your productivity with our modern todo app.</p>
                  <div className="welcome-actions">
                    <a href="/login" className="btn btn-primary">Sign In</a>
                    <a href="/register" className="btn btn-google">Create Account</a>
                  </div>
                </div>
              )}
            </Route>
            <Route exact path="/login">
              <Login onLogin={handleLogin} />
            </Route>
            <Route exact path="/register">
              <Register onLogin={handleLogin} />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
