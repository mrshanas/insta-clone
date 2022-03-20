import React from "react";
import { Card, Avatar } from "antd";
import Meta from "antd/lib/card/Meta";
import noDp from "../../assets/images/no-profile-picture.svg";

const Posts = ({ posts }) => {
  return (
    <div className="post__container">
      {posts.map((post, i) => (
        <Card
          className="post"
          key={post._id}
          cover={<img src={post.photo} alt={`post by ${post._id} ${i}`} />}
          actions={[
            `${post.likes.length} likes`,
            `${post.comments.length} Comments`,
          ]}
        >
          <Avatar src={post.author.avatar ? post.author.avatar : noDp} />
          <Meta description={post.caption} title={`${post.author.username}`} />
        </Card>
      ))}
    </div>
  );
};

export default Posts;
