import "../../assets/styles/users.css";

const Users = ({ usersData }) => {
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
