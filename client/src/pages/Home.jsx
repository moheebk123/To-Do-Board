import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { ActivityLog, Header, TaskInput, Tasks, Users } from "../components";
import { actionLogService, taskService, userService } from "../api";
import { actionLogActions, taskActions, usersActions } from "../store";
import "../assets/styles/home.css";
import { useCallback } from "react";
import { socketConnection } from "../utils/socket";

const Home = () => {
  const socket = useMemo(() => socketConnection, []);

  const [data, setData] = useState({
    showTaskInput: false,
    action: "add",
    noteId: "",
    title: "",
    description: "",
  });
  const [taskData, setTaskData] = useState({
    Todo: [],
    "In Progress": [],
    Done: [],
  });
  const [usersData, setUsersData] = useState([]);

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
        updatedAt: task?.updatedAt,
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
        updatedAt: "",
      });
    }
  };

  const triggerRefetch = useCallback(() => {
    socket.emit("tasksChanges");
  }, [socket]);

  const fetchData = useCallback(() => {
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

    fetchTasks();
    fetchUsers();
    fetchLogs();
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [dispatch, fetchData]);

  useEffect(() => {
    socket.on("changesFetched", (data) => {
      const { tasks, logs, users } = data;
      dispatch(taskActions.updateTasks({ tasks }));
      dispatch(actionLogActions.updateActionLog({ logs }));
      dispatch(usersActions.updateUsers({ users }));
    });

    return () => {
      socket.off("changesFetched");
    };
  }, [dispatch, socket]);

  useEffect(() => {
    socket.on("usersFetched", (data) => {
      const { users } = data;
      dispatch(usersActions.updateUsers({ users }));
    });

    return () => {
      socket.off("usersFetched");
    };
  }, [dispatch, socket]);

  useEffect(() => {
    const taskGroups = {
      Todo: [],
      "In Progress": [],
      Done: [],
    };

    tasks.forEach((task) => {
      if (taskGroups[task.status]) {
        taskGroups[task.status].push(task);
      }
    });

    setTaskData(taskGroups);

    const computedUsers = users.map((user) => {
      const assignedTasks = tasks.reduce(
        (count, task) =>
          task.assignedTo === user.userName ? count + 1 : count,
        0
      );
      return {
        ...user,
        taskCount: assignedTasks,
      };
    });

    setUsersData(computedUsers);
  }, [tasks, users]);

  return (
    <div>
      <Header />
      {data.showTaskInput ? (
        <TaskInput
          action={data.action}
          task={data}
          handleHideTaskInput={handleShowHideTaskInput}
          triggerRefetch={triggerRefetch}
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
        triggerRefetch={triggerRefetch}
      />
      <div className="users-and-activity-box">
        <Users usersData={usersData} />
        <ActivityLog />
      </div>
    </div>
  );
};

export default Home;
