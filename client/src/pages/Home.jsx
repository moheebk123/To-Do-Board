import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { ActivityLog, Header, TaskInput, Tasks, Users } from "../components";
import { actionLogService, taskService, userService } from "../api";
import { actionLogActions, taskActions, usersActions } from "../store";
import "../assets/styles/home.css";

const Home = () => {
  const [data, setData] = useState({
    showTaskInput: false,
    action: "add",
    noteId: "",
    title: "",
    description: "",
  });

  const { tasks } = useSelector((state) => state.taskData);
  const { users } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const handleShowHideTaskInput = () => {
    setData((prev) => ({ ...prev, showTaskInput: !prev.showTaskInput }));
  };

  const handleChangeTaskInput = (newAction, task) => {
    if (task && newAction === "edit") {
      setData({
        title: task.title,
        description: task?.description,
        priority: task?.priority,
        assignedTo: task?.assignedTo,
        action: newAction,
        taskId: task?._id,
        showTaskInput: true,
      });
    } else {
      setData({
        action: newAction,
        showTaskInput: true,
        title: "",
        description: "",
        priority: "",
        assignedTo: "",
        taskId: "",
      });
    }
  };

  const fetchTasks = async () => {
    const response = await taskService.getAllTasks();
    if (response.type === "success" && response.tasks) {
      dispatch(taskActions.updateTasks({ tasks: response.tasks }));
    }
  };

  const fetchUsers = async () => {
    const response = await userService.getAllUsers();
    if (response.type === "success" && response.users) {
      dispatch(usersActions.updateUsers({ users: response.users }));
    }
  };

  const fetchLogs = async () => {
    const response = await actionLogService.getLatestLogs();
    if (response.type === "success" && response.logs) {
      dispatch(actionLogActions.updateActionLog({ logs: response.logs }));
    }
  };

  const fetchData = () => {
    fetchTasks();
    fetchUsers();
    fetchLogs();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [dispatch]);

  const taskData = {
    Todo: [],
    "In Progress": [],
    Done: [],
  }

  tasks.forEach((task) => {
    if (taskData[task.status]) {
      taskData[task.status].push(task);
    }
  });

  const usersData = users.map((user) => {
    const assignedTasks = tasks.reduce(
      (assignedTasks, tasks) =>
        tasks.assignedTo === user.userName ? assignedTasks + 1 : assignedTasks,
      0
    );
    return {
      ...user,
      taskCount: assignedTasks,
    };
  });

  return (
    <div>
      <Header />
      {data.showTaskInput ? (
        <TaskInput
          action={data.action}
          task={data}
          handleHideTaskInput={handleShowHideTaskInput}
          fetchData={fetchData}
        />
      ) : (
        <button
          className="add-task-btn"
          onClick={() => handleChangeTaskInput("add", undefined)}
        >
          <FaPlus className="add-icon" />
          New
        </button>
      )}
      <Tasks
        taskData={taskData}
        handleChangeTaskInput={handleChangeTaskInput}
        handleHideTaskInput={handleShowHideTaskInput}
        fetchData={fetchData}
      />
      <div className="users-and-activity-box">
        <Users usersData={usersData} />
        <ActivityLog />
      </div>
    </div>
  );
};

export default Home;
