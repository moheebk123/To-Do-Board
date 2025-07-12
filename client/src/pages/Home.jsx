import { useEffect } from "react";
import { ActivityLog, Header, Tasks, Users } from "../components";
import "../assets/styles/home.css";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <Tasks />
      <div className="users-and-activity-box">
        <Users />
        <ActivityLog />
      </div>
    </div>
  );
};

export default Home;
