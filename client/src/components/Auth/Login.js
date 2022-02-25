import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import { Navigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.users.isLogged);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {isLogged && <Navigate to="/" replace={true} />}
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          autoComplete="false"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="password"
          autoComplete="off"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        <input type="submit" value="Log In" />
      </form>
    </>
  );
};

export default Login;
