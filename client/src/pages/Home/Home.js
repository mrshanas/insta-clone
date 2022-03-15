import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
// import API from "../../api";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="app__home">
      Home this protected route
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default Home;
