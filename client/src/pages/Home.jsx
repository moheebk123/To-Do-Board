import { useEffect } from "react";
import { Header } from "../components";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div>
    <Header />
    Todo Board
  </div>;
};

export default Home;
