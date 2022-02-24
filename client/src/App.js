import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./actions/auth";
import { fetchGoals } from "./actions/goals";

const App = () => {
  // 1.React-Redux
  // 2.React-router
  // 3.Material UI styling
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    login(loginData);
  };

  const handleChange = (e) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));

    console.log(loginData);
  };
  return (
    <>
      <h1>Goal setter </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={loginData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
      {/*<button onClick={() => fetchGoals()}>Get</button>*/}
    </>
  );
};

export default App;
