const API_URL = `${String(import.meta.env.VITE_BACKEND_API_URL)}/auth`;

class AuthService {
  async login(payload) {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Login failed");
      }

      return {
        data: data.data || null,
        message: data.message,
        type: "success",
      };
    } catch (error) {
      return {
        data: null,
        message: error.message || "Something went wrong",
        type: "error",
      };
    }
  }

  async register(payload) {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Registration failed");
      }

      return {
        data: data.data || null,
        message: data.message,
        type: "success",
      };
    } catch (error) {
      return {
        data: null,
        message: error.message || "Something went wrong",
        type: "error",
      };
    }
  }

  async logout() {
    try {
      const res = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Logout failed");
      }

      return {
        message: data.message,
        type: "success",
      };
    } catch (error) {
      return {
        message: error.message || "Something went wrong",
        type: "error",
      };
    }
  }

  async checkAuth() {
    try {
      const res = await fetch(`${API_URL}/check-auth`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Not authenticated");
      }

      return {
        data: data.user,
        message: "Authenticated",
        type: "success",
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
        type: "error",
      };
    }
  }
}

const authService = new AuthService();
export default authService;

