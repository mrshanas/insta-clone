import React, { useState } from "react";
import API from "../../../../api";

const Comment = ({ postID }) => {
  const [comment, setComment] = useState({ comment: "" });

  const handleChange = (e) => {
    setComment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post(`/post/${postID}/comment`, comment).then(
      setComment({ comment: "" })
    );
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <input
        type="text"
        name="comment"
        placeholder="Add comment..."
        value={comment.comment}
        onChange={handleChange}
      />
      <input type="submit" value="Post" />
    </form>
  );
};

export default Comment;
