import { getAllGoals, createGoal } from "../api";

export const fetchGoals = () => async (dispatch) => {
  try {
    const res = await getAllGoals();
    console.log(res);
    dispatch({ type: "FETCH_ALL", data: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const createAGoal = (goalData) => async (dispatch) => {
  try {
    const res = await createGoal(goalData);
    console.log(res);
    dispatch({ type: "CREATE", data: res.data });
  } catch (error) {
    console.log(error);
  }
};
