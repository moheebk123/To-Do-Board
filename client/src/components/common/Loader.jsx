import { loader } from "../../assets/img";
import "../../assets/styles/loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={loader} className="loader-image" alt="Loading..." />
    </div>
  );
};

export default Loader;
