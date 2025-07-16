import { useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaTrash } from "react-icons/fa";
import { taskService } from "../../api";
import { alertActions } from "../../store";
import "../../assets/styles/tasks.css";

const Tasks = ({
  taskData,
  handleChangeTaskInput,
  triggerRefetch,
}) => {
  const dispatch = useDispatch();

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    const response = await taskService.moveTask(draggableId, {
      status: destination.droppableId,
    });

    if (response.type === "success") {
      triggerRefetch();
    }

    dispatch(
      alertActions.showAlert({
        show: true,
        message: response.message,
        type: response.type,
      })
    );
  };

  const deleteTask = async (id) => {
    const response = await taskService.deleteTask(id);
    if (response.type === "success") {
      triggerRefetch();
    }
    dispatch(
      alertActions.showAlert({
        show: true,
        message: response.message,
        type: response.type,
      })
    );
  };

  const smartAssign = async (id) => {
    const response = await taskService.smartAssignTask(id);
    if (response.type === "success") {
      triggerRefetch();
    }
    dispatch(
      alertActions.showAlert({
        show: true,
        message: response.message,
        type: response.type,
      })
    );
  };


  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  className="task-list"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {items.length === 0 ? (
                    <div className="task-card">
                      <div className="task-title">No task in it</div>
                    </div>
                  ) : (
                    items.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="task-card"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            onClick={() => handleChangeTaskInput("edit", task)}
                          >
                            <button
                              className="btn delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTask(task._id);
                              }}
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
                                <button
                                  className="btn save assign"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    smartAssign(task._id);
                                  }}
                                >
                                  Smart Assign
                                </button>
                              )}
                            </div>

                            <div className="task-date">
                              {new Date(task.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Tasks;
