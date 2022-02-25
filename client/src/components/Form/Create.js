import React, { useState } from "react";
import { createAGoal } from "../../actions/goals";
import { useDispatch } from "react-redux";

const CreateGoal = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAGoal(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        value={formData.title}
      />
      <input
        name="description"
        placeholder="Description"
        onChange={handleChange}
        value={formData.description}
      />
      <input type="submit" value="Create" />
    </form>
  );
};

export default CreateGoal;
