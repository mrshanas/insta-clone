import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const secretPage = (req, res) => {
  res.send("Welcome to my secret page");
};

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     //const user = await User.find({ email: email });
//     await User.find({ email: email }, (err, user) => {
//       if (!err) {
//         bcrypt.compare(password, user.password, (err, result) => {
//           if (result) return res.redirect("/secrets");
//         });
//       } else {
//         return res.redirect("/secrets");
//       }
//     }).clone();
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
//};

export const loginUser = async (req, res) => {
  const user = await User.find({ email: req.body.email });
  if (user) {
    console.log(user);
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (match) {
      return res.redirect("/secrets");
    }
  } else {
    res.status(404).json({
      message: "User not found please login",
    });
  }
};

export const logoutUser = async () => {};

export const registerUser = async (req, res) => {
  const { password } = req.body;
  try {
    let userDetails;
    bcrypt.hash(password, 10, (err, hash) => {
      if (!err) {
        userDetails = { ...req.body, password: hash };
        const user = User.create(userDetails);
        return res.status(201).json({ user });
      }
    });
  } catch (error) {
    res.status(409).json({
      message: "User with that email already exists",
    });
  }
};
