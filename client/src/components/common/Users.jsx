import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../../api";
import { usersActions } from "../../store";
import "../../assets/styles/users.css";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { tasks } = useSelector((state) => state.taskData);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await userService.getAllUsers();
      if (response.type === "success" && response.users) {
        dispatch(usersActions.updateUsers({ users: response.users }));
      }
    };
    fetchUsers();
  }, [dispatch]);

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
    <div className="users-container">
      <h2 className="users-title">Active Users</h2>
      <div className="users-list">
        {usersData.length === 0 ? (
          <p className="no-user">No users found.</p>
        ) : (
          usersData.map((user, idx) => (
            <div key={idx} className="user-card">
              <div className="user-avatar">
                {user.userName.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <p className="user-name">{user.userName}</p>
                <p className="user-email">
                  Tasks Assigned: {user.taskCount || 0}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Users;
