import Post from "../models/postModel.js";
import Comment from "../models/comment.js";

export const displayPosts = (req, res) => {
  Post.find({})
    .populate("author", "_id username avatar")
    .sort("-createdAt")
    .then((posts) => res.status(200).json({ posts }))
    .catch((err) => res.status(500));
};

export const createPost = (req, res) => {
  const post = req.body;
  post.author = req.user.id;

  Post.create(post, (err, post) => {
    if (!err) {
      res.status(201).json({ message: "Successfully created", post });
    } else {
      res.status(500).json({ message: "Internal server error" });
      console.log(err);
    }
  });
};

export const displayPostCommentsAndLikes = (req, res) => {
  Post.findOne({ _id: req.params.postID })
    .populate("author", "_id username avatar")
    .populate("likes", "_id username avatar")
    .select("-comments")
    .then((post) => {
      Comment.find({ post: post._id })
        .populate("author", "_id username avatar")
        .sort("-createdAt")
        .then((comments) => res.status(200).json({ post, comments }));
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ message: err.message });
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
export const likeOrDislikePost = (req, res) => {
  Post.findById(req.params.postId)
    .then((post) => {
      if (!post.likes.includes(req.user.id)) {
        post.likes.push(req.user.id);
        post.save();
      } else {
        const index = post.likes.indexOf(req.user.id);
        post.likes.splice(index, 1);
        post.save();
      }
      return res.status(200);
    })
    .catch((err) =>
      res.status(404).json({ message: "Post not found", error: err })
    );
};

// comments logic
export const commentPost = (req, res) => {
  const comment = req.body;
  comment.post = req.params.postId;
  comment.author = req.user.id;

  Comment.create(comment)
    .then((comment) => {
      Post.findById(req.params.postId)
        .then((post) => {
          post.comments.push(comment._id);
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
