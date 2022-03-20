import React, { useState, useEffect } from "react";
import API from "../../api";

const Post = ({ postID }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    API.get(`/post/${postID}`)
      .then(({ data }) => setPost(data))
      .catch((err) => console.error(err));
  }, [postID]);

  console.log(post);

  return (
    <div className="post__img">
      <div>
        <img src={post.post.photo} alt={`Post by ${post.post.author}`} />
      </div>
      <aside>Comments</aside>
    </div>
  );
};
export default Post;
