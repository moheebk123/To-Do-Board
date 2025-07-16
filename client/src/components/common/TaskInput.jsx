import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle, FaTimesCircle, FaSave } from "react-icons/fa";
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

  const [conflictData, setConflictData] = useState({
    show: false,
    current: {},
  });

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
    priority: task.priority || "Low",
    assignedTo: task.assignedTo || "",
    updatedAt: task.updatedAt || "",
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
    handleHideTaskInput();
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
      handleHideTaskInput();
    } else if (
      response.type === "error" &&
      response.message.includes("Conflict detected")
    ) {
      setConflictData({ show: true, current: response.conflict });
      setFormData((prev) => ({
        ...prev,
        updatedAt: response.conflict.updatedAt,
      }));
    }
  };

  const handleMerge = async () => {
    const payload = {
      title: conflictData.current.title + formData.title,
      description: conflictData.current.description + formData.description,
      updatedAt: formData.updatedAt,
    };
    const response = await taskService.updateTask(task.taskId, payload);
    dispatch(
      alertActions.showAlert({
        show: true,
        message: response.message,
        type: response.type,
      })
    );
    if (response.type === "success") {
      triggerRefetch();
      handleHideTaskInput();
    }
  };

  const handleOverwrite = () => {
    updateTask(task.taskId);
  };

  const handleClose = () => {
    setConflictData({ show: false, current: {} });
    handleHideTaskInput();
  };

  const handleSubmit = () => {
    action === "add" ? addTask() : updateTask(task.taskId);
  };

  return (
    <div className="task-form-container">
      <div className="task-form">
        <h2>
          {action === "add"
            ? "Create Task"
            : conflictData.show
            ? "Resolve Conflict"
            : "Update Task"}
        </h2>
        <br />

        {conflictData.show ? (
          <>
            <div>
              <h3>Server Version</h3>
              <br />
              <p>
                <strong>Title</strong>: {conflictData.current.title}
              </p>
              <br />
              <p>
                <strong>Description</strong>: {conflictData.current.description}
              </p>
              <p>Priority: {conflictData.current.priority}</p>
              <p>Assigned To: {conflictData.current.assignedTo}</p>
            </div>
            <hr />
            <h3>Your Version</h3>
          </>
        ) : (
          <></>
        )}

        <h4>Title</h4>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          disabled={conflictData.show}
        />

        <h4>Description</h4>
        <textarea
          placeholder="Description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          disabled={conflictData.show}
        />

        {!conflictData.show && (
          <>
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
              disabled={conflictData.show}
            >
              <option value="">Assign to (optional)</option>
              {users.map((user) => (
                <option key={user._id} value={user.userName}>
                  {user.userName}
                </option>
              ))}
            </select>
          </>
        )}

        <div className="task-form-buttons">
          {conflictData.show ? (
            <>
              <button className="btn close" onClick={handleMerge}>
                Merge
              </button>
              <button className="btn save" onClick={handleOverwrite}>
                Overwrite
              </button>
            </>
          ) : (
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
          )}

          <button className="btn close" onClick={handleClose}>
            <FaTimesCircle /> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
