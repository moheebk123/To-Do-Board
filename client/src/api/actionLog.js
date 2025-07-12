const API_URL = `${String(import.meta.env.VITE_BACKEND_API_URL)}/logs`;

class ActionLogService {
  async getLatestLogs() {
    try {
      const res = await fetch(`${API_URL}/latest`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch logs");
      }

      return {
        data: data.data || [],
        message: data.message,
        type: "success",
      };
    } catch (error) {
      return {
        data: [],
        message: error.message || "Something went wrong",
        type: "error",
      };
    }
  }
}

const actionLogService = new ActionLogService();
export default actionLogService;
