import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const user = await User.find({ email: req.body.email });
  if (user) {
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (match) {
      //console.log(user);
      const token = jwt.sign({ id: user[0]._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({
        token,
      });
    }
  } else {
    res.status(404).json({
      message: "User not found, Please login",
    });
  }
};

// export const logoutUser = (req, res) => {
//   req.user = null;
//   res.status(200).json({ message: "Bye!, Sorry to see you leave" });
// };

// Logging out user will be handled in the client side

export const registerUser = async (req, res) => {
  const { password } = req.body;
  try {
    let userDetails;
    bcrypt.hash(password, 10, (err, hash) => {
      if (!err) {
        userDetails = { ...req.body, password: hash };
        User.create(userDetails, (err, user) => {
          // assign jwt after user registers
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          if (!err) {
            return res.status(201).json({
              success: true,
              token,
            });
          } else {
            return res.status(409).json({
              message: "User with that email already exists",
            });
          }
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
