import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { taskService } from "../../api";
import { alertActions } from "../../store";
import "../../assets/styles/tasks.css";

const Tasks = ({ taskData, handleChangeTaskInput, handleHideTaskInput, fetchData }) => {
  const dispatch = useDispatch();

  const deleteTask = async (id) => {
    const response = await taskService.deleteTask(id);
    if (response.type === "success") {
      fetchData();
    }
    dispatch(
      alertActions.showAlert({
        show: true,
        message: response.message,
        type: response.type,
      })
    );

    handleHideTaskInput();
  };

  const smartAssign = async (id) => {
    const response = await taskService.smartAssignTask(id);
    if (response.type === "success") {
      fetchData();
    }
    dispatch(
      alertActions.showAlert({
        show: true,
        message: response.message,
        type: response.type,
      })
    );

    handleHideTaskInput();
  };

  return (
    <div className="kanban-board">
      {Object.entries(taskData).map(([status, items]) => (
        <div key={status} className="kanban-column">
          <div
            className={`kanban-header ${status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            <h3>{status}</h3>
            <span className="count">{items.length}</span>
          </div>
          <div className="task-list">
            {items.length === 0 ? (
              <div className="task-card">
                <div className="task-title">No task in it</div>
              </div>
            ) : (
              items.map((task) => (
                <div
                  key={task._id}
                  className="task-card"
                  onClick={() => handleChangeTaskInput("edit", task)}
                >
                  <button
                    className="btn delete"
                    onClick={() => deleteTask(task._id)}
                  >
                    <FaTrash />
                  </button>
                  <div className="task-title">{task.title}</div>

                  <div className="task-priority-assigned-box">
                    <div
                      className={`task-priority priority-${task.priority.toLowerCase()}`}
                    >
                      {task.priority}
                    </div>

                    <div
                      className={`task-assigned ${
                        task.assignedTo ? "assigned" : "unassigned"
                      }`}
                    >
                      {task.assignedTo || "Not Assigned"}
                    </div>
                    {!task.assignedTo && (
                      <button className="btn save assign" onClick={() => smartAssign(task._id)}>Smart Assign</button>
                    )}
                  </div>

                  <div className="task-date">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
