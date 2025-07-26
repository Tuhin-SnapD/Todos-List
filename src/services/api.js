const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async sendOTP(emailData) {
    return this.request('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify(emailData)
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async googleLogin(googleToken) {
    return this.request('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ google_token: googleToken })
    });
  }

  // Todo methods
  async getTodos() {
    return this.request('/todos');
  }

  async createTodo(todoData) {
    return this.request('/todos', {
      method: 'POST',
      body: JSON.stringify(todoData)
    });
  }

  async updateTodo(todoId, todoData) {
    return this.request(`/todos/${todoId}`, {
      method: 'PUT',
      body: JSON.stringify(todoData)
    });
  }

  async deleteTodo(todoId) {
    return this.request(`/todos/${todoId}`, {
      method: 'DELETE'
    });
  }

  async toggleTodo(todoId) {
    return this.request(`/todos/${todoId}/toggle`, {
      method: 'PATCH'
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

export default new ApiService(); 