import { useSelector } from "react-redux";
import "../../assets/styles/activityLog.css";

const ActivityLog = () => {
  const { logs } = useSelector((state) => state.actionLogData);

  return (
    <div className="activity-log-container">
      <h2 className="activity-log-title">Activity Logs</h2>
      <div className="activity-log-list">
        {logs.length === 0 ? (
          <p className="no-log">No activity logs available.</p>
        ) : (
          logs.map((log, index) => {
            const { who, taskTitle, action, details, updatedAt } = log;

            return (
              <div key={index} className="activity-log-item">
                <p className="log-description">
                  <span>{who}</span> performed <span>{action}</span> on{" "}
                  <span>{taskTitle}</span>
                </p>
                <p className="log-description">
                  Changed <span>{!details.field ? "_" : details.field}</span>{" "}
                  from <span>{!details.before ? "_" : details.before}</span> to{" "}
                  <span>{!details.after ? "_" : details.after}</span>
                </p>
                <p className="log-time">
                  {new Date(updatedAt).toLocaleString()}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
