import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/auth.css";

const AuthWrapper = ({ type = "login" }) => {
  const [form, setForm] = useState({ userName: "", password: "" });

  const content = {
    login: {
      heading: "Login to your account",
      buttonText: "Login",
      question: "Don't have an account?",
      routeText: "Register",
      route: "/register",
      apiCall: () => console.log("Login with", form),
    },
    register: {
      heading: "Create a new account",
      buttonText: "Register",
      question: "Already have an account?",
      routeText: "Login",
      route: "/login",
      apiCall: () => console.log("Register with", form),
    },
  };

  const { heading, buttonText, question, routeText, route, apiCall } =
    content[type];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiCall();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-heading">{heading}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={form.userName}
            onChange={handleChange}
            className="auth-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
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
