import React from "react";
import Picture from "../tuhin.png";

export const About = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-8">
          <section className="aboutus">
            <h2 className="aboutus-title">About the App</h2>
            <p className="aboutus-text">
              This Todo List is a full-stack web application designed to help users efficiently manage their daily tasks. Built with a React frontend and Flask backend, it supports user registration, authentication, and full CRUD operations for todos.
            </p>
            <p className="aboutus-text">
              Users can add, edit, delete, and mark todos as complete or incomplete. The app also supports a dark mode toggle and works seamlessly across devices with its responsive Bootstrap 5 design.
            </p>
            <h5 className="mt-4">Key Features:</h5>
            <ul className="aboutus-text">
              <li>User registration & login with JWT authentication</li>
              <li>Create, read, update, and delete todos</li>
              <li>Dark mode toggle</li>
              <li>SQLite database integration</li>
              <li>RESTful API backend</li>
            </ul>
            <h5 className="mt-4">Tech Stack:</h5>
            <p className="aboutus-text">
              <strong>Frontend:</strong> React, Bootstrap 5, React Router, React Icons<br />
              <strong>Backend:</strong> Flask, SQLAlchemy, JWT-Extended, Bcrypt, CORS<br />
              <strong>Database:</strong> SQLite
            </p>
            <p>
              <a
                className="aboutus-more"
                href="https://github.com/Tuhin-SnapD"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Source Code on GitHub
              </a>
            </p>
          </section>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <div className="aboutus-banner">
            <img
              src={Picture}
              width="320"
              alt="Tuhin Chakrabarty"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
