import React from "react";
import { Card, Avatar } from "antd";
import Meta from "antd/lib/card/Meta";

const Posts = ({ posts }) => {
  return (
    <div>
      {posts.map((post, i) => (
        <Card
          style={{ width: 500 }}
          key={post._id}
          cover={<img src={post.photo} alt={`post by ${post._id} ${i}`} />}
          actions={[`${post.likes.length} likes`, "Comment"]}
        >
          <Meta description={post.caption} />
        </Card>
      ))}
    </div>
  );
};

export default Posts;
