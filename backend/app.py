from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import os
import random
import string
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import threading

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = 'your-secret-key-change-this-in-production'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'jwt-secret-key-change-this-in-production'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Email Configuration
try:
    from config import EMAIL_CONFIG
    app.config.update(EMAIL_CONFIG)
except ImportError:
    # Fallback configuration
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = 'your-email@gmail.com'  # Set your email
    app.config['MAIL_PASSWORD'] = 'your-app-password'     # Set your app password

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=True)  # Nullable for Google OAuth
    is_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    todos = db.relationship('Todo', backref='user', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return f'<User {self.username}>'

class OTPVerification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    otp = db.Column(db.String(6), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)
    is_used = db.Column(db.Boolean, default=False)

    def is_expired(self):
        return datetime.utcnow() > self.expires_at

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    done = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'done': self.done,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

def generate_otp():
    """Generate a 6-digit OTP"""
    return ''.join(random.choices(string.digits, k=6))

def send_email_async(to_email, subject, body):
    """Send email asynchronously"""
    def send_email():
        try:
            msg = MIMEMultipart()
            msg['From'] = app.config['MAIL_USERNAME']
            msg['To'] = to_email
            msg['Subject'] = subject
            
            msg.attach(MIMEText(body, 'html'))
            
            server = smtplib.SMTP(app.config['MAIL_SERVER'], app.config['MAIL_PORT'])
            server.starttls()
            server.login(app.config['MAIL_USERNAME'], app.config['MAIL_PASSWORD'])
            text = msg.as_string()
            server.sendmail(app.config['MAIL_USERNAME'], to_email, text)
            server.quit()
        except Exception as e:
            print(f"Email sending failed: {e}")
    
    thread = threading.Thread(target=send_email)
    thread.start()

def send_verification_email(email, otp):
    """Send verification email with OTP"""
    subject = "Verify Your Email - Todos List"
    body = f"""
    <html>
        <body>
            <h2>Welcome to Todos List!</h2>
            <p>Your verification code is: <strong>{otp}</strong></p>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't create an account, please ignore this email.</p>
        </body>
    </html>
    """
    send_email_async(email, subject, body)

# Authentication Routes
@app.route('/api/auth/send-otp', methods=['POST'])
def send_otp():
    data = request.get_json()
    
    if not data or not data.get('email'):
        return jsonify({'error': 'Email is required'}), 400
    
    email = data['email']
    
    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user and existing_user.is_verified:
        return jsonify({'error': 'Email already registered'}), 400
    
    # Generate OTP
    otp = generate_otp()
    expires_at = datetime.utcnow() + timedelta(minutes=10)
    
    # Save OTP to database
    otp_record = OTPVerification(
        email=email,
        otp=otp,
        expires_at=expires_at
    )
    
    try:
        db.session.add(otp_record)
        db.session.commit()
        
        # For development/testing, print OTP to console instead of sending email
        print(f"🔐 OTP for {email}: {otp}")
        
        # Only send email if email is configured
        if app.config['MAIL_USERNAME'] != 'your-email@gmail.com':
            send_verification_email(email, otp)
        
        return jsonify({'message': 'OTP sent successfully', 'otp': otp}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error in send_otp: {e}")
        return jsonify({'error': 'Failed to send OTP'}), 500

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('email') or not data.get('password') or not data.get('otp'):
        return jsonify({'error': 'Missing required fields'}), 400
    
    email = data['email']
    otp = data['otp']
    
    # Verify OTP
    otp_record = OTPVerification.query.filter_by(
        email=email, 
        otp=otp, 
        is_used=False
    ).first()
    
    if not otp_record or otp_record.is_expired():
        return jsonify({'error': 'Invalid or expired OTP'}), 400
    
    # Check if user already exists
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already exists'}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), 400
    
    # Hash password
    password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    
    # Create new user
    new_user = User(
        username=data['username'],
        email=email,
        password_hash=password_hash,
        is_verified=True
    )
    
    try:
        db.session.add(new_user)
        otp_record.is_used = True
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(identity=str(new_user.id))
        
        return jsonify({
            'message': 'User registered successfully',
            'access_token': access_token,
            'user': {
                'id': new_user.id,
                'username': new_user.username,
                'email': new_user.email
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Registration failed'}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Missing username or password'}), 400
    
    user = User.query.filter_by(username=data['username']).first()
    
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        if not user.is_verified:
            return jsonify({'error': 'Please verify your email first'}), 401
        
        access_token = create_access_token(identity=str(user.id))
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

# Google OAuth placeholder (you'll need to implement this with Google OAuth library)
@app.route('/api/auth/google', methods=['POST'])
def google_login():
    data = request.get_json()
    
    if not data or not data.get('google_token'):
        return jsonify({'error': 'Google token is required'}), 400
    
    # This is a placeholder - you'll need to implement Google OAuth verification
    # For now, we'll just return an error
    return jsonify({'error': 'Google OAuth not implemented yet'}), 501

# Todo Routes
@app.route('/api/todos', methods=['GET'])
@jwt_required()
def get_todos():
    current_user_id = int(get_jwt_identity())
    todos = Todo.query.filter_by(user_id=current_user_id).order_by(Todo.created_at.desc()).all()
    return jsonify([todo.to_dict() for todo in todos]), 200

@app.route('/api/todos', methods=['POST'])
@jwt_required()
def create_todo():
    current_user_id = int(get_jwt_identity())
    data = request.get_json()
    
    if not data or not data.get('title'):
        return jsonify({'error': 'Title is required'}), 400
    
    new_todo = Todo(
        title=data['title'],
        description=data.get('description', ''),
        user_id=current_user_id
    )
    
    try:
        db.session.add(new_todo)
        db.session.commit()
        return jsonify(new_todo.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to create todo'}), 500

@app.route('/api/todos/<int:todo_id>', methods=['PUT'])
@jwt_required()
def update_todo(todo_id):
    current_user_id = int(get_jwt_identity())
    todo = Todo.query.filter_by(id=todo_id, user_id=current_user_id).first()
    
    if not todo:
        return jsonify({'error': 'Todo not found'}), 404
    
    data = request.get_json()
    
    if 'title' in data:
        todo.title = data['title']
    if 'description' in data:
        todo.description = data['description']
    if 'done' in data:
        todo.done = data['done']
    
    todo.updated_at = datetime.utcnow()
    
    try:
        db.session.commit()
        return jsonify(todo.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update todo'}), 500

@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
@jwt_required()
def delete_todo(todo_id):
    current_user_id = int(get_jwt_identity())
    todo = Todo.query.filter_by(id=todo_id, user_id=current_user_id).first()
    
    if not todo:
        return jsonify({'error': 'Todo not found'}), 404
    
    try:
        db.session.delete(todo)
        db.session.commit()
        return jsonify({'message': 'Todo deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete todo'}), 500

@app.route('/api/todos/<int:todo_id>/toggle', methods=['PATCH'])
@jwt_required()
def toggle_todo(todo_id):
    current_user_id = int(get_jwt_identity())
    todo = Todo.query.filter_by(id=todo_id, user_id=current_user_id).first()
    
    if not todo:
        return jsonify({'error': 'Todo not found'}), 404
    
    todo.done = not todo.done
    todo.updated_at = datetime.utcnow()
    
    try:
        db.session.commit()
        return jsonify(todo.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to toggle todo'}), 500

# Health check route
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Backend is running'}), 200

if __name__ == '__main__':
    with app.app_context():
        try:
            db.create_all()
            print("✅ Database tables created successfully")
        except Exception as e:
            print(f"⚠️ Database initialization warning: {e}")
            # Continue anyway, tables might already exist
    app.run(debug=True, host='0.0.0.0', port=5000) 