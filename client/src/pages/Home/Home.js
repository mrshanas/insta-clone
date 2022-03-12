import React from "react";
import { useNavigate } from "react-router-dom";
// import API from "../../api";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      Home this protected route
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default Home;
