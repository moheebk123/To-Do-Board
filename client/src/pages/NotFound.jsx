import { useEffect } from "react";
import { Error } from "../components";

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Error type="not-found" />;
};

export default NotFound;
