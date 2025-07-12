import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { alertActions, userDataActions } from "../../store";
import { authService } from "../../api";
import { logo } from "../../assets/img";
import "../../assets/styles/header.css";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const user = useSelector((store) => store.userData.userData);
  const dispatch = useDispatch();

  const logout = async () => {
    const response = await authService.logout();
    dispatch(
      alertActions.showAlert({
        show: true,
        message: response.message,
        type: response.type,
      })
    );
    dispatch(userDataActions.updateUser(null));
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="App Logo" className="logo-img" />
      </div>

      <div className="user-menu-container">
        <FaUserCircle
          className="user-icon"
          size={28}
          onClick={() => setOpenDropdown((prev) => !prev)}
        />

        {openDropdown && (
          <div className="dropdown">
            <div className="user-profile">
              <div className="user-initial">
                {user?.userName?.charAt(0)?.toUpperCase()}
              </div>
              <div className="user-name">{user?.userName}</div>
            </div>

            <hr />
            <button className="logout-btn" onClick={logout}>
              <FaSignOutAlt className="logout-icon" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
