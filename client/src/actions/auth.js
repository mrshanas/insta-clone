import { loginUser, registerUser } from "../api";

export const login = async (loginData) => {
  try {
    const { data } = loginUser(loginData);
    //console.log(res);
    return { type: "LOGIN", data };
  } catch (error) {
    console.log(error);
  }
};

export const register = async (registerData) => {
  try {
    const { data } = registerUser(registerData);
    return { type: "REGISTER", data };
  } catch (error) {
    console.log(error);
  }
};
