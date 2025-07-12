import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../../api";
import { usersActions } from "../../store";
import "../../assets/styles/users.css";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await userService.getAllUsers();
      if (response.type === "success" && response.users) {
        dispatch(usersActions.updateUsers({ users: response.users }));
      }
    };
    fetchUsers();
  }, [dispatch]);

  return (
    <div className="users-container">
      <h2 className="users-title">Active Users</h2>
      <div className="users-list">
        {users.length === 0 ? (
          <p className="no-user">No users found.</p>
        ) : (
          users.map((user, idx) => (
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
