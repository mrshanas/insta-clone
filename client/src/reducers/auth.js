export const users = (userState = { authData: null }, action) => {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      localStorage.setItem("token", JSON.stringify(action.data));
      return { ...userState, authData: action.data, isLogged: true };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...userState, authData: null, isLogged: false };

    default:
      return userState;
  }
};
