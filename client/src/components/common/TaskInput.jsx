import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle, FaTimesCircle, FaTrash, FaSave } from "react-icons/fa";
import { taskService } from "../../api";
import { alertActions } from "../../store";
import "../../assets/styles/taskForm.css";

const TaskInput = ({
  task = {},
  action,
  handleHideTaskInput,
  triggerRefetch,
}) => {
  const { users } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
    priority: task.priority || "Low",
    assignedTo: task.assignedTo || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addTask = async () => {
    const response = await taskService.createTask(formData);
    dispatch(
      alertActions.showAlert({
        show: true,
        message: response.message,
        type: response.type,
      })
    );
    if (response.type === "success") {
      triggerRefetch();
    }
  };

  const updateTask = async (id) => {
    const response = await taskService.updateTask(id, formData);
    dispatch(
      alertActions.showAlert({
        show: true,
        message: response.message,
        type: response.type,
      })
    );
    if (response.type === "success") {
      triggerRefetch();
    }
  };

  const handleSubmit = () => {
    action === "add" ? addTask() : updateTask(task.taskId);
    handleHideTaskInput();
  };

  return (
    <div className="task-form-container">
      <div className="task-form">
        <h2>{action === "add" ? "Create Task" : "Update Task"}</h2>
        <br />

        <h4>Title</h4>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <h4>Description</h4>
        <textarea
          placeholder="Description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
        />

        <h4>Priority</h4>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Low">Priority: Low</option>
          <option value="Medium">Priority: Medium</option>
          <option value="High">Priority: High</option>
        </select>

        <h4>Assigned User</h4>
        <select
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
        >
          <option value="">Assign to (optional)</option>
          {users.map((user) => (
            <option key={user._id} value={user.userName}>
              {user.userName}
            </option>
          ))}
        </select>

        <div className="task-form-buttons">
          <button className="btn save" onClick={handleSubmit}>
            {action === "add" ? (
              <>
                <FaCheckCircle /> Create
              </>
            ) : (
              <>
                <FaSave /> Update
              </>
            )}
          </button>

          {/* {action === "add" && (
            <button className="btn delete" onClick={() => onDelete(task._id)}>
              <FaTrash /> Delete
            </button>
          )} */}

          <button className="btn close" onClick={handleHideTaskInput}>
            <FaTimesCircle /> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
