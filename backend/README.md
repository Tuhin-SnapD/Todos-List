# Todos List Backend

A Flask-based REST API backend for the Todos List application with user authentication and database storage.

## Features

- User registration and login with JWT authentication
- CRUD operations for todos
- SQLite database with SQLAlchemy ORM
- Password hashing with bcrypt
- CORS enabled for frontend integration

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Todos (requires authentication)
- `GET /api/todos` - Get all todos for the authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/<id>` - Update a todo
- `DELETE /api/todos/<id>` - Delete a todo
- `PATCH /api/todos/<id>/toggle` - Toggle todo completion status

### Health Check
- `GET /api/health` - Check if the server is running

## Database

The application uses SQLite database (`todos.db`) which will be created automatically when you first run the application.

## Security Notes

- Change the secret keys in production
- Use environment variables for sensitive configuration
- Consider using a more robust database like PostgreSQL for production 