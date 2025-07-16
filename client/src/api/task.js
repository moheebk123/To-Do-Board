const API_URL = `${String(import.meta.env.VITE_BACKEND_API_URL)}/api/tasks`;

class TaskService {
  async getAllTasks() {
    try {
      const res = await fetch(`${API_URL}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch tasks");
      }

      return {
        tasks: data.tasks || [],
        message: data.message,
        type: "success",
      };
    } catch (error) {
      return {
        tasks: [],
        message: error.message || "Something went wrong",
        type: "error",
      };
    }
  }

  async createTask(payload) {
    try {
      const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to create task");
      }

      return {
        data: data.data,
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

  async updateTask(id, payload) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to update task");
      }

      return {
        data: data.data,
        message: data.message,
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

  async deleteTask(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to delete task");
      }

      return {
        message: data.message,
        type: "success",
      };
    } catch (error) {
      return {
        message: error.message,
        type: "error",
      };
    }
  }

  async moveTask(id, payload) {
    try {
      const res = await fetch(`${API_URL}/${id}/move`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to move task");
      }

      return {
        data: data.data,
        message: data.message,
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

  async smartAssignTask(id) {
    try {
      const res = await fetch(`${API_URL}/${id}/smart-assign`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Smart assign failed");
      }

      return {
        data: data.data,
        message: data.message,
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

const taskService = new TaskService();
export default taskService;
