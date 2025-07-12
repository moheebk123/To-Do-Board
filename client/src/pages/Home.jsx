import { useEffect } from "react";
import { ActivityLog, Header, Users } from "../components";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <Users />
      <ActivityLog />
    </div>
  );
};

export default Home;
