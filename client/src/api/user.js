const API_URL = `${String(import.meta.env.VITE_BACKEND_API_URL)}/users`;

class UserService {
  async getAllUsers() {
    try {
      const res = await fetch(`${API_URL}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch users");
      }

      return {
        users: data.users || [],
        message: data.message,
        type: "success",
      };
    } catch (error) {
      return {
        users: [],
        message: error.message || "Something went wrong",
        type: "error",
      };
    }
  }
}

const userService = new UserService();
export default userService;
