import { useEffect } from "react";
import { ActivityLog, Header } from "../components";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div>
    <Header />
    <ActivityLog />
  </div>;
};

export default Home;
