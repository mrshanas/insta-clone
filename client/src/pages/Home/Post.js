import React, { useState, useEffect } from "react";
import API from "../../api";
import { Avatar, Comment } from "antd";
import { Link } from "react-router-dom";
import noDp from "../../assets/images/no-profile-picture.svg";

const Post = ({ postID }) => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get(`/post/${postID}`)
      .then(({ data }) => {
        setPost(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, [postID]);

  console.log(post);

  return (
    <>
      {error && <p>Internal server error</p>}
      {post && (
        <div className="post__img">
          <div>
            <img src={post.post.photo} alt={`Post by ${post.post.author}`} />
          </div>
          <aside>
            {post.comments.map((comment) => (
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
                content={<p>{comment.comment}</p>}
              />
            ))}
          </aside>
        </div>
      )}
    </>
  );
};
export default Post;
