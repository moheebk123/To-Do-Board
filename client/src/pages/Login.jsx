import { useEffect } from "react";
import { AuthWrapper } from "../components";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <AuthWrapper type="login" />
};

export default Login;
