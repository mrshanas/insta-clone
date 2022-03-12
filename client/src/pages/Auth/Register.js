import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
import API from "../../api";

const Register = () => {
  const user = localStorage.getItem("token");
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    avatar: "",
  });

  const onDone = ({ base64 }) => {
    setNewUser((prev) => ({ ...prev, avatar: base64 }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post("/auth/register", newUser)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };
  return user ? (
    <Navigate to="/" replace />
  ) : (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={newUser.username}
        placeholder="Enter username"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={newUser.password}
        placeholder="Enter password"
        onChange={handleChange}
      />
      <input
        type="text"
        name="bio"
        value={newUser.bio}
        placeholder="Enter bio"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={newUser.email}
        placeholder="Enter email"
        onChange={handleChange}
      />
      <FileBase64 multiple={false} onDone={onDone} type="file" />
      <input type="submit" value="Sign up" />
    </form>
  );
};

export default Register;
