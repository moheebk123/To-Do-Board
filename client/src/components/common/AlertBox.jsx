import { useSelector } from "react-redux";
import "../../assets/styles/alertBox.css";

const AlertBox = () => {
  const { show, type, message } = useSelector((store) => store.showAlert);

  if (!show) return null;

  return (
    <div className="alert-box">
      <p className={`alert-message ${type}`}>{message}</p>
    </div>
  );
};

export default AlertBox;
