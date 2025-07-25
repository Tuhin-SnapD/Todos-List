import React, { useState, useEffect } from 'react';
import { Header } from './MyComponents/Header';
import { Todos } from './MyComponents/Todos';
import { Footer } from './MyComponents/Footer';
import { AddTodo } from './MyComponents/AddTodo';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { About } from './MyComponents/About';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const addTodo = (title, desc) => {
    setTodos(prevTodos => {
      const sno = prevTodos.length > 0 ? prevTodos[prevTodos.length - 1].sno + 1 : 0;
      return [...prevTodos, { sno, title, desc }];
    });
  };

  const onDelete = (todo) => {
    setTodos(prevTodos => prevTodos.filter(e => e !== todo));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header title="Todos List" />
        <main className="flex-grow-1">
          <Switch>
            <Route exact path="/">
              <AddTodo addTodo={addTodo} />
              <Todos todos={todos} onDelete={onDelete} />
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
