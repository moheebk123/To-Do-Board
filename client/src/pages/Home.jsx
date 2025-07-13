import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivityLog, Header, Tasks, Users } from "../components";
import { actionLogService, taskService, userService } from "../api";
import { actionLogActions, taskActions, usersActions } from "../store";
import "../assets/styles/home.css";

const Home = () => {
  const { tasks } = useSelector((state) => state.taskData);
  const { users } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchTasks = async () => {
      const response = await taskService.getAllTasks();
      if (response.type === "success" && response.tasks) {
        dispatch(taskActions.updateTasks({ tasks: response.tasks }));
      }
    };
    fetchTasks();

    const fetchUsers = async () => {
      const response = await userService.getAllUsers();
      if (response.type === "success" && response.users) {
        dispatch(usersActions.updateUsers({ users: response.users }));
      }
    };
    fetchUsers();

    const fetchLogs = async () => {
      const response = await actionLogService.getLatestLogs();
      if (response.type === "success" && response.logs) {
        dispatch(actionLogActions.updateActionLog({ logs: response.logs }));
      }
    };
    fetchLogs();
  }, [dispatch]);

  const taskData = {
    Todo: [],
    "In Progress": [],
    Done: [],
  };

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
      <Tasks taskData={taskData} />
      <div className="users-and-activity-box">
        <Users usersData={usersData} />
        <ActivityLog />
      </div>
    </div>
  );
};

export default Home;
