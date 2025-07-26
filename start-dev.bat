@echo off
echo Starting Todos List Development Environment...
echo.

echo Starting Flask Backend...
cd backend
start "Flask Backend" cmd /k "python app.py"

echo.
echo Starting React Frontend...
cd ..
start "React Frontend" cmd /k "npm start"

echo.
echo Development servers are starting...
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:3000
echo.
pause 