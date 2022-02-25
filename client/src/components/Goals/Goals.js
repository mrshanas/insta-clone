import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGoals } from "../../actions/goals";

const Goals = () => {
  const dispatch = useDispatch();
  const { goals } = useSelector((state) => state.goalsReducer);
  useEffect(() => {
    dispatch(fetchGoals());
  }, []);
  console.log(goals);

  return (
    <div>
      {goals.length ? (
        goals.map((goal, i) => (
          <div key={i}>
            <h1>{goal.title}</h1>
            <p>{goal.description}</p>
            <small>{goal.createdAt}</small>
          </div>
        ))
      ) : (
        <h1>No goals yet!!</h1>
      )}
    </div>
  );
};

export default Goals;
