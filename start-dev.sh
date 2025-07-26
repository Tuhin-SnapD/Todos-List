#!/bin/bash

echo "Starting Todos List Development Environment..."
echo

echo "Starting Flask Backend..."
cd backend
gnome-terminal --title="Flask Backend" -- bash -c "python app.py; exec bash" &

echo
echo "Starting React Frontend..."
cd ..
gnome-terminal --title="React Frontend" -- bash -c "npm start; exec bash" &

echo
echo "Development servers are starting..."
echo "Backend will be available at: http://localhost:5000"
echo "Frontend will be available at: http://localhost:3000"
echo 