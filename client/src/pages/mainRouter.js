import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./Home/Home";
import API from "../api";
import Protected from "../components/Protected";
import Profile from "../components/Profile/";

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
