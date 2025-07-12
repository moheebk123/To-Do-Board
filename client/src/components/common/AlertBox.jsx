import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/alertBox.css";
import { useEffect, useState } from "react";
import { alertActions } from "../../store";

const AlertBox = () => {
  const [visible, setVisible] = useState(false);

  const { show, type, message } = useSelector((store) => store.showAlert);

  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timeout = setTimeout(() => {
        setVisible(false);
        dispatch(alertActions.showAlert(undefined));
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [show, dispatch]);

  if (!show) return null;

  return (
    <div className={`alert-box ${visible ? "show" : ""}`}>
      <p className={`alert-message ${type}`}>{message}</p>
    </div>
  );
};

export default AlertBox;
