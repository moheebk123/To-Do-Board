const API_URL = `${String(import.meta.env.VITE_BACKEND_API_URL)}/api/auth`;

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
        user: data.user || null,
        message: data.message,
        type: "success",
        success: data.success || true,
      };
    } catch (error) {
      return {
        user: null,
        message: error.message || "Something went wrong",
        type: "error",
        success: false,
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
        user: data.user || null,
        message: data.message,
        type: "success",
        success: data.success || true,
      };
    } catch (error) {
      return {
        user: null,
        message: error.message || "Something went wrong",
        type: "error",
        success: false,
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
        success: data.success || true,
      };
    } catch (error) {
      return {
        message: error.message || "Something went wrong",
        type: "error",
        success: false,
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
        user: data.user || null,
        message: "Authenticated",
        type: "success",
        success: true
      };
    } catch (error) {
      console.log(error.message)
      return {
        user: null,
        message: error.message,
        type: "error",
        success: false,
      };
    }
  }
}

const authService = new AuthService();
export default authService;

