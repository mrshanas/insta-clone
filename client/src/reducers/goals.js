export const goals = (goals = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;

    default:
      return goals;
  }
};
