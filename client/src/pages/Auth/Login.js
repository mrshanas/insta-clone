import React, { useState } from "react";
import API from "../../api";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const user = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post("/auth/login", form)
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
        type="email"
        name="email"
        value={form.email}
        placeholder="Enter your email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={form.password}
        placeholder="Enter your password"
        onChange={handleChange}
      />
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
