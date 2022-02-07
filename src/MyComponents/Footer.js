import React from 'react';

export const Footer = () => {
  let footerStyle = {
    position: "relative",
    top: "57vh",
    width: "100%",
    border: "3px solid grey"
  }
  return (
    <footer className="bg-dark text-light py-1" style={footerStyle}>
      <p className="text-center">
        Copyright 2022 &copy; MyTodosList.com
      </p>
    </footer>
  )
};
