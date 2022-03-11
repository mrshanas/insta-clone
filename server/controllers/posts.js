import Post from "../models/postModel";

export const displayPosts = (req, res) => {
  Post.find({ author: req.user.id }, (err, goals) => {
    !err
      ? res.status(200).json({ goals })
      : res.status(404).json({
          message: "Not found",
        });
    console.log(err);
  });
};

export const createPost = (req, res) => {
  const post = req.body;
  post.author = req.user.id;

  Post.create(post, (err, goal) => {
    !err
      ? res.status(201).json({ message: "Successfully created", post })
      : res.status(500).json({
          message: "Internal server error",
        });
  });
};

export const displayPost = (req, res) => {
  Post.find({ author: req.user.id, _id: req.params.postID }, (err, post) => {
    !err
      ? res.status(200).json({
          success: true,
          post,
        })
      : res.status(404).json({
          success: false,
          message: "Post not found",
        });
  });
};

export const deletePost = (req, res) => {
  Post.deleteOne({ author: req.user.id, _id: req.params.postID }, (err) => {
    !err
      ? res.status(204)
      : res.status(404).json({
          success: false,
          message: "A post with that id does not exist",
        });
  });
};

export const updatePost = (req, res) => {
  Post.findOneAndUpdate(
    { author: req.user.id, _id: req.params.goalID },
    req.body,
    { returnDocument: "after" },
    (err, updatedPost) => {
      !err
        ? res.status(200).json({ success: true, post: updatedPost })
        : res.status(404).json({ success: false, message: err });
    }
  );
};
