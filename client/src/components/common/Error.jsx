import { MdError, MdLock, MdSearchOff } from "react-icons/md";
import { Link } from "react-router";
import "../../assets/styles/error.css";

const Error = ({ type = "not-found" }) => {
  const content = {
    "not-found": {
      icon: <MdSearchOff className="error-icon" />,
      title: "404 - Page Not Found",
      message: "The page you're looking for doesn't exist.",
      buttonLabel: "Go Home",
      route: "/",
    },
    "not-allowed": {
      icon: <MdLock className="error-icon" />,
      title: "403 - Access Denied",
      message: "You are not allowed to view this page.",
      buttonLabel: "Go Home",
      route: "/",
    },
    default: {
      icon: <MdError className="error-icon" />,
      title: "Error",
      message: "Something went wrong.",
      buttonLabel: "Go Home",
      route: "/",
    },
  };

  const { icon, title, message, buttonLabel, route } =
    content[type] || content.default;

  return (
    <div className="error-container">
      <div className="error-card">
        {icon}
        <h1 className="error-title">{title}</h1>
        <p className="error-message">{message}</p>
        <Link to={route}>
          <button className="error-button">{buttonLabel}</button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
