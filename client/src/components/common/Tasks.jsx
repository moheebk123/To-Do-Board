import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskService } from "../../api";
import { taskActions } from "../../store";
import "../../assets/styles/tasks.css";

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.taskData);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await taskService.getAllTasks();
      if (response.type === "success" && response.tasks) {
        dispatch(taskActions.updateTasks({ tasks: response.tasks }));
      }
    };
    fetchTasks();
  }, [dispatch]);

  const columns = {
    Todo: [],
    "In Progress": [],
    Done: [],
  };

  tasks.forEach((task) => {
    if (columns[task.status]) {
      columns[task.status].push(task);
    }
  });

  return (
    <div className="kanban-board">
      {Object.entries(columns).map(([status, items]) => (
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
                <div key={task._id} className="task-card">
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
