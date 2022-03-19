import Post from "../models/postModel.js";
import Comment from "../models/comment.js";

export const displayPosts = (req, res) => {
  Post.find({ author: req.user.id }, (err, posts) => {
    !err
      ? res.status(200).json({ posts })
      : res.status(404).json({
          message: "Not found",
        });
    console.log(err);
  });
};

export const createPost = (req, res) => {
  const post = req.body;
  post.author = req.user.id;

  Post.create(post, (err, post) => {
    !err
      ? res.status(201).json({ message: "Successfully created", post })
      : res.status(500).json({
          message: "Internal server error",
        });
  });
};

export const displayPostAndComments = (req, res) => {
  Post.find({ _id: req.params.postID }, (err, post) => {
    if (!err) {
      Comment.find(post.comments).then((comments) =>
        res.status(200).json({ post: post[0], comments })
      );
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  });
};

export const deletePost = (req, res) => {
  // this controller delete a post and its related comments
  Post.deleteOne({ _id: req.params.postID })
    .then((deletedPost) => {
      Comment.deleteMany(deletedPost.comments).then(() => res.status(204));
    })
    .catch((err) =>
      res.status(404).json({ message: "post with that id doesnt exist", err })
    );
};

// liking and disliking posts
export const likeOrDislikePost = (req, res) => {};

// comments logic
export const commentPost = (req, res) => {
  const comment = req.body;
  comment.post = req.params.postId;
  comment.author = req.user.id;

  Comment.create(comment)
    .then((comment) => {
      Post.findByIdAndUpdate(req.params.postId)
        .then((post) => {
          post.comments.push(req.params.postID);
          post.save();
          return res
            .status(201)
            .json({ message: "Comment successfully created", post, comment });
        })
        .catch((err) => res.status(500));
    })
    .catch((err) =>
      res.status(500).json({ message: "Internal server error", error: err })
    );
};

export const deleteComment = (req, res) => {
  Comment.findByIdAndDelete(req.params.commentID, (err, comm) => {
    if (err) {
      res.status(404).json({
        message: "Comment not found",
      });
    } else {
      res.status(204);
    }
  });
};
