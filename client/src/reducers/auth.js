const userData = {
  token: null,
  isLogged: false,
};

export const users = (userState = userData, action) => {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      localStorage.setItem("token", JSON.stringify(action.data));
      return { ...userState, token: action.data.token, isLogged: true };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...userState, token: null, isLogged: false };

    default:
      return userState;
  }
};
