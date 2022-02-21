import Goal from "../models/goalModel.js";
// Next step is retrieve a specific goal with query parameter

export const displayGoals = (req, res) => {
  Goal.find({ author: req.user.id }, (err, goals) => {
    if (!err) {
      res.status(200).json({ goals });
    } else {
      console.log(err);
      res.status(404).json({
        message: "Not found",
      });
    }
  });
};

export const createGoal = (req, res) => {
  const goal = req.body;
  goal.author = req.user.id;
  console.log(req.user);
  Goal.create(goal, (err, doc) => {
    if (!err) {
      res.status(201).json({ message: "Successfully created", doc });
    } else {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  });
};
