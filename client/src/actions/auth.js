import { loginUser } from "../api";

export const login = async (loginData) => {
  try {
    const { data } = loginUser(loginData);
    //console.log(res);
    return { type: "LOGIN", payload: data };
  } catch (error) {
    console.log(error);
  }
};
