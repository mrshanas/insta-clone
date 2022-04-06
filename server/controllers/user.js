import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import Post from "../models/postModel.js";

export const loginUser = async (req, res) => {
  const user = await User.find({ email: req.body.email });
  if (user) {
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (match) {
      const token = jwt.sign({ id: user[0]._id }, process.env.JWT_SECRET, {
        expiresIn: "48h",
      });
      res.status(200).json({
        token,
        expiresIn: 48 * 60,
      });
    }
  } else {
    res.status(404).json({
      message: "User not found, Please login",
    });
  }
};

export const registerUser = async (req, res) => {
  const { password } = req.body;
  try {
    let userDetails;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (!err) {
        userDetails = { ...req.body, password: hashedPassword };
        User.create(userDetails, (err, user) => {
          // assign jwt after user registers
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "48h",
          });
          if (!err) {
            return res.status(201).json({
              token,
              expiresIn: 48 * 60,
            });
          } else {
            return res.status(409).json({
              message:
                "User with that email or username already exists, Please try another username",
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

export const displayUserAndPosts = (req, res) => {
  User.find({ username: req.params.username })
    .then((response) => {
      Post.find({ author: response[0]._id }).then((posts) =>
        res.status(200).json({
          user: response[0],
          posts,
        })
      );
    })
    .catch((err) => console.error(err));
};

export const followOrUnfollowUser = (req, res) => {
  User.findByIdAndUpdate({ _id: req.user.id })
    .then((user) => {
      User.findOneAndUpdate({ username: req.params.username })
        .then((userToBeFollowed) => {
          // condition to check if user is already followed
          if (!userToBeFollowed.followers.includes(user._id)) {
            // the requested user is not followed by logged in user
            userToBeFollowed.followers.push(user._id);
            user.following.push(userToBeFollowed._id);
            user.save();
            userToBeFollowed.save();
            return res.status(200).json({ message: "Successfully followed" });
          } else {
            // unfollow the user and remove logged in user followers

            // remove the logged user in followers list
            const userLoggedIndex = userToBeFollowed.followers.indexOf(
              user._id
            );
            userToBeFollowed.followers.splice(userLoggedIndex, 1); // only remove one element

            // remove the req user from following list
            const userIndex = user.following.indexOf(userToBeFollowed._id);
            user.following.splice(userIndex, 1);
            userToBeFollowed.save();
            user.save();
            return res.status(200).json({ message: "Successfully unfollowed" });
          }
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};
