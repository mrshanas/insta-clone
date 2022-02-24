const userData = {
  token: "",
};

const users = (userState = userData, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...action.payload };
      break;

    default:
      break;
  }
};
