export const goalsReducer = (goals = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.data;

    case "CREATE":
      return [...goals, action.data];

    default:
      return goals;
  }
};
