import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./Home/Home";
import Protected from "./Protected";
import Profile from "./Profile/index";

const MainRouter = () => {
  const user = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Protected user={user}>
              <Home />
            </Protected>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path=":username"
          element={
            <Protected user={user}>
              <Profile />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
