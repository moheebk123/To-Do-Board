import { useEffect } from "react";
import { AuthWrapper } from "../components";

const Register = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return <AuthWrapper type="register" />
};

export default Register;
