import requests
import json

BASE_URL = 'http://localhost:5000/api'

def test_otp_step_by_step():
    print("🔍 Debugging OTP Registration Step by Step")
    
    # Step 1: Test health endpoint
    print("\n1. Testing health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}")
    except Exception as e:
        print(f"   Error: {e}")
        return
    
    # Step 2: Test OTP sending
    print("\n2. Testing OTP sending...")
    try:
        data = {"email": "debug@example.com"}
        response = requests.post(f"{BASE_URL}/auth/send-otp", json=data)
        print(f"   Status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Success: {result}")
            otp = result.get('otp', '123456')
        else:
            print(f"   Error: {response.text}")
            return
    except Exception as e:
        print(f"   Error: {e}")
        return
    
    # Step 3: Test registration with OTP
    print("\n3. Testing registration with OTP...")
    try:
        data = {
            "username": "debuguser",
            "email": "debug@example.com",
            "password": "password123",
            "otp": otp
        }
        response = requests.post(f"{BASE_URL}/auth/register", json=data)
        print(f"   Status: {response.status_code}")
        
        if response.status_code == 201:
            result = response.json()
            print(f"   Success: User registered!")
            print(f"   User: {result['user']['username']}")
            return result['access_token']
        else:
            print(f"   Error: {response.text}")
            return None
    except Exception as e:
        print(f"   Error: {e}")
        return None

if __name__ == "__main__":
    test_otp_step_by_step() 