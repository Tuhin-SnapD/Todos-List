# Todos List Application

A full-stack todo list application with user authentication, built with React frontend and Flask backend.

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Dark mode toggle
- Responsive design with Bootstrap
- Database storage (SQLite)
- RESTful API backend

## Project Structure

```
Todos-List/
├── src/                    # React frontend
│   ├── MyComponents/      # React components
│   ├── services/          # API service layer
│   └── App.js            # Main application component
├── backend/               # Flask backend
│   ├── app.py            # Main Flask application
│   ├── requirements.txt  # Python dependencies
│   └── README.md         # Backend documentation
└── README.md             # This file
```

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.7 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Start the Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the project root:
```bash
cd Todos-List
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Register a new account or login with existing credentials
3. Start creating and managing your todos!

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

## Technologies Used

### Frontend
- React 17
- React Router DOM
- Bootstrap 5
- React Icons

### Backend
- Flask
- Flask-SQLAlchemy
- Flask-JWT-Extended
- Flask-Bcrypt
- Flask-CORS
- SQLite

## Development

### Running in Development Mode

Both frontend and backend support hot reloading in development mode.

### Database

The application uses SQLite database (`todos.db`) which is automatically created when you first run the backend.

### Environment Variables

For production, consider setting up environment variables for:
- `SECRET_KEY`
- `JWT_SECRET_KEY`
- `DATABASE_URL`

## Security Notes

- Change the secret keys in production
- Use environment variables for sensitive configuration
- Consider using a more robust database like PostgreSQL for production
- Implement proper CORS policies for production deployment

