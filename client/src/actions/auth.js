import { loginUser, registerUser } from "../api";

export const login = (loginData) => async (dispatch) => {
  try {
    const { data } = await loginUser(loginData);
    //console.log(res);

    dispatch({ type: "LOGIN", data });
  } catch (error) {
    console.log(error);
  }
};

export const register = (registerData) => async (dispatch) => {
  try {
    const { data } = registerUser(registerData);
    dispatch({ type: "REGISTER", data });
  } catch (error) {
    console.log(error);
  }
};
