import { useEffect } from "react";
import { Error } from "../components";

const NotAllowed = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Error type="not-allowed" />;
};

export default NotAllowed;
