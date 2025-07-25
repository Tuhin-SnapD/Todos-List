import React from 'react';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-dark text-light py-2 border-top border-secondary w-100 mt-auto">
      <p className="text-center mb-0">
        Copyright {year} &copy; MyTodosList.com
      </p>
    </footer>
  );
};