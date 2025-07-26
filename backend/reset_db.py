import os
import sqlite3
from app import app, db, User, Todo, OTPVerification

def reset_database():
    print("🔄 Resetting database...")
    
    # Remove existing database
    db_path = os.path.join(app.instance_path, 'todos.db')
    if os.path.exists(db_path):
        try:
            os.remove(db_path)
            print(f"✅ Removed existing database: {db_path}")
        except Exception as e:
            print(f"⚠️ Could not remove database: {e}")
    
    # Create new database with all tables
    with app.app_context():
        try:
            # Drop all tables first
            db.drop_all()
            print("✅ Dropped all existing tables")
            
            # Create all tables
            db.create_all()
            print("✅ Created all tables with new schema")
            
            # Verify tables exist
            inspector = db.inspect(db.engine)
            tables = inspector.get_table_names()
            print(f"📋 Available tables: {tables}")
            
            # Check User table columns
            if 'user' in tables:
                columns = [col['name'] for col in inspector.get_columns('user')]
                print(f"👤 User table columns: {columns}")
                
                # Check if is_verified column exists
                if 'is_verified' in columns:
                    print("✅ is_verified column exists in User table")
                else:
                    print("❌ is_verified column missing from User table")
            
            # Check OTPVerification table
            if 'otp_verification' in tables:
                columns = [col['name'] for col in inspector.get_columns('otp_verification')]
                print(f"🔐 OTPVerification table columns: {columns}")
            
            print("🎉 Database reset completed successfully!")
            
        except Exception as e:
            print(f"❌ Error resetting database: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    reset_database() 