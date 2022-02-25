import Goal from "../models/goalModel.js";

export const displayGoals = (req, res) => {
  Goal.find({ author: req.user.id }, (err, goals) => {
    !err
      ? res.status(200).json({ goals })
      : res.status(404).json({
          message: "Not found",
        });
    console.log(err);
  });
};

export const createGoal = (req, res) => {
  const goal = req.body;
  goal.author = req.user.id;

  Goal.create(goal, (err, goal) => {
    !err
      ? res.status(201).json({ message: "Successfully created", goal })
      : res.status(500).json({
          message: "Internal server error",
        });
  });
};

export const displayGoal = (req, res) => {
  Goal.find({ author: req.user.id, _id: req.params.goalID }, (err, goal) => {
    !err
      ? res.status(200).json({
          success: true,
          goal,
        })
      : res.status(404).json({
          success: false,
          message: "Goal not found",
        });
  });
};

export const deleteGoal = (req, res) => {
  Goal.deleteOne({ author: req.user.id, _id: req.params.goalID }, (err) => {
    !err
      ? res.status(204)
      : res.status(404).json({
          success: false,
          message: "A goal with that id does not exist",
        });
  });
};

export const updateGoal = (req, res) => {
  Goal.findOneAndUpdate(
    { author: req.user.id, _id: req.params.goalID },
    req.body,
    { returnDocument: "after" },
    (err, updatedGoal) => {
      !err
        ? res.status(200).json({ success: true, goal: updatedGoal })
        : res.status(404).json({ success: false, message: err });
    }
  );
};
