import requests
import json

BASE_URL = "http://localhost:5000/api"

def test_health():
    print("🔍 Testing Health Check...")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def test_register():
    print("📝 Testing User Registration...")
    
    # Step 1: Send OTP
    print("  Step 1: Sending OTP...")
    email_data = {"email": "test3@example.com"}
    response = requests.post(f"{BASE_URL}/auth/send-otp", json=email_data)
    print(f"  OTP Status: {response.status_code}")
    
    if response.status_code != 200:
        try:
            error_data = response.json()
            print(f"  OTP Error: {error_data}")
        except:
            print(f"  OTP Error: Status {response.status_code}")
        return None
    
    # Step 2: Register with OTP (using the actual OTP from response)
    print("  Step 2: Registering with OTP...")
    otp_response = response.json()
    actual_otp = otp_response.get('otp', '123456')  # Use actual OTP or fallback
    
    data = {
        "username": "testuser3",
        "email": "test3@example.com",
        "password": "password123",
        "otp": actual_otp
    }
    response = requests.post(f"{BASE_URL}/auth/register", json=data)
    print(f"  Registration Status: {response.status_code}")
    if response.status_code == 201:
        result = response.json()
        print(f"  User registered: {result['user']['username']}")
        return result['access_token']
    else:
        print(f"  Registration Error: {response.json()}")
        return None

def test_login():
    print("🔐 Testing User Login...")
    data = {
        "username": "testuser3",
        "password": "password123"
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=data)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"User logged in: {result['user']['username']}")
        return result['access_token']
    else:
        print(f"Error: {response.json()}")
        return None

def test_create_todo(token):
    print("➕ Testing Create Todo...")
    headers = {"Authorization": f"Bearer {token}"}
    data = {
        "title": "Test Todo",
        "description": "This is a test todo item"
    }
    response = requests.post(f"{BASE_URL}/todos", json=data, headers=headers)
    print(f"Status: {response.status_code}")
    if response.status_code == 201:
        result = response.json()
        print(f"Todo created: {result['title']}")
        return result['id']
    else:
        print(f"Error: {response.json()}")
        return None

def test_get_todos(token):
    print("📋 Testing Get Todos...")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/todos", headers=headers)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        todos = response.json()
        print(f"Found {len(todos)} todos")
        for todo in todos:
            print(f"  - {todo['title']}: {todo['description']} (Done: {todo['done']})")
        return todos
    else:
        print(f"Error: {response.json()}")
        return []

def test_update_todo(token, todo_id):
    print("✏️ Testing Update Todo...")
    headers = {"Authorization": f"Bearer {token}"}
    data = {
        "title": "Updated Test Todo",
        "description": "This todo has been updated"
    }
    response = requests.put(f"{BASE_URL}/todos/{todo_id}", json=data, headers=headers)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Todo updated: {result['title']}")
        return True
    else:
        print(f"Error: {response.json()}")
        return False

def test_toggle_todo(token, todo_id):
    print("🔄 Testing Toggle Todo...")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.patch(f"{BASE_URL}/todos/{todo_id}/toggle", headers=headers)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Todo toggled: {result['title']} (Done: {result['done']})")
        return True
    else:
        print(f"Error: {response.json()}")
        return False

def test_delete_todo(token, todo_id):
    print("🗑️ Testing Delete Todo...")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.delete(f"{BASE_URL}/todos/{todo_id}", headers=headers)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print("Todo deleted successfully")
        return True
    else:
        print(f"Error: {response.json()}")
        return False

def main():
    print("🚀 Starting API Tests...\n")
    
    # Test health check
    test_health()
    
    # Test registration
    token = test_register()
    if not token:
        print("❌ Registration failed, cannot continue tests")
        return
    
    # Test login
    token = test_login()
    if not token:
        print("❌ Login failed, cannot continue tests")
        return
    
    # Test create todo
    todo_id = test_create_todo(token)
    if not todo_id:
        print("❌ Create todo failed, cannot continue tests")
        return
    
    # Test get todos
    todos = test_get_todos(token)
    
    # Test update todo
    test_update_todo(token, todo_id)
    
    # Test toggle todo
    test_toggle_todo(token, todo_id)
    
    # Test get todos again to see changes
    test_get_todos(token)
    
    # Test delete todo
    test_delete_todo(token, todo_id)
    
    # Test get todos one more time to confirm deletion
    test_get_todos(token)
    
    print("\n✅ All tests completed!")

if __name__ == "__main__":
    main() 