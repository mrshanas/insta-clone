import React, { useState, useEffect } from "react";
import API from "../../../../api";
import { Avatar, Comment } from "antd";
import { Link } from "react-router-dom";
import noDp from "../../../../assets/images/no-profile-picture.svg";
import CommentPost from "../Comment/Comment";
import decode from "jwt-decode";

const Post = ({ postID }) => {
  const userId = decode(localStorage.getItem("token")).id;

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    let isMounted = true;
    API.get(`/post/${postID}`)
      .then(({ data }) => {
        if (isMounted) {
          setPost(data.post);
          setError(null);
          setLikes(data.post.likes.map((user) => user._id));
          setComments(data.comments);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
    return () => {
      isMounted = false;
    };
  }, [postID, userId]);

  const likeOrUnlikePost = (e) =>
    API.post(`/post/${post._id}/like`).then((res) => console.log(res));
  return (
    <>
      {error && <p>Internal server error</p>}
      {post && (
        <div className="post__img">
          <div>
            <img src={post.photo} alt={`Post by ${post.author}`} />
          </div>
          <aside>
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                author={
                  <Link to={`/user/${comment.author.username}`}>
                    {comment.author.username}
                  </Link>
                }
                avatar={
                  <Avatar
                    src={comment.author.avatar ? comment.author.avatar : noDp}
                  />
                }
                content={
                  <p>
                    <strong>{comment.author.username} </strong>
                    {comment.comment}
                  </p>
                }
              />
            ))}
            <button onClick={likeOrUnlikePost}>
              {likes.includes(userId) ? "Unlike" : "Like"}
            </button>

            <p>{post.likes.length} Likes</p>
            <CommentPost postID={post._id} />
          </aside>
        </div>
      )}
    </>
  );
};
export default Post;
