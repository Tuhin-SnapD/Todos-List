import React, { useState, useEffect } from "react";
import { Header } from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { Footer } from "./MyComponents/Footer";
import { AddTodo } from "./MyComponents/AddTodo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { About } from "./MyComponents/About";
import { FaMoon, FaSun } from "react-icons/fa";
import './App.css';

function App() {
  const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(initialTodos);
  const [darkMode, setDarkMode] = useState(false);

  const addTodo = (title, desc) => {
    setTodos((prevTodos) => {
      const sno =
        prevTodos.length > 0
          ? prevTodos[prevTodos.length - 1].sno + 1
          : 0;
      return [
        ...prevTodos,
        { sno, title, description: desc, done: false },
      ];
    });
  };

  const onDelete = (todo) => {
    setTodos((prevTodos) => prevTodos.filter((e) => e !== todo));
  };

  const handleToggleDone = (todoToToggle) => {
    setTodos(
      todos.map((todo) =>
        todo.sno === todoToToggle.sno ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleEdit = (todoToEdit, newTitle, newDescription) => {
    setTodos(
      todos.map((todo) =>
        todo.sno === todoToEdit.sno
          ? { ...todo, title: newTitle, description: newDescription }
          : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  return (
    <Router>
      <div className={darkMode ? "dark-mode App d-flex flex-column min-vh-100" : "App d-flex flex-column min-vh-100"}>
        <Header title="Todos List" darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="flex-grow-1">
          <Switch>
            <Route exact path="/">
              <AddTodo addTodo={addTodo} />
              <Todos
                todos={todos}
                onDelete={onDelete}
                onToggleDone={handleToggleDone}
                onEdit={handleEdit}
              />
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
