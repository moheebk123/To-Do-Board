import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../../api/auth";
import { alertActions, userDataActions } from "../../store";
import "../../assets/styles/auth.css";
import { socketConnection } from "../../utils/socket";

const AuthWrapper = ({ type = "login" }) => {
  const socket = useMemo(() => socketConnection, []);

  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  const dispatch = useDispatch();

  const content = {
    login: {
      heading: "Login to your account",
      buttonText: "Login",
      question: "Don't have an account?",
      routeText: "Register",
      route: "/register",
    },
    register: {
      heading: "Create a new account",
      buttonText: "Register",
      question: "Already have an account?",
      routeText: "Login",
      route: "/login",
    },
  };

  const { heading, buttonText, question, routeText, route } = content[type];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = userNameRef.current.value;
    const password = passwordRef.current.value;

    if (!userName || !password) {
      dispatch(
        alertActions.showAlert({
          show: true,
          message: "All fields are required",
          type: "error",
        })
      );
    }

    const payload = {
      userName,
      password,
    };

    let response;
    if (type === "login") {
      response = await authService.login(payload);
    } else if (type === "register") {
      response = await authService.register(payload);
    }

    dispatch(
      alertActions.showAlert({
        show: true,
        message: response.message,
        type: response.type,
      })
    );

    if (response.user && response.user.userName) {
      if (type === "register") {
        console.log("user registered")
        socket.emit("userRegister");
      }
      dispatch(
        userDataActions.updateUser(response.user)
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-heading">{heading}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            ref={userNameRef}
            type="text"
            name="userName"
            placeholder="Username"
            className="auth-input"
          />
          <input
            ref={passwordRef}
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
          />
          <button type="submit" className="auth-submit">
            {buttonText}
          </button>
        </form>
        <div className="auth-footer">
          <span>{question}</span>
          <Link to={route} className="auth-link">
            {routeText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
