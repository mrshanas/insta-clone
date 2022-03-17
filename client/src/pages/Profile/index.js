import React from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
import { useQuery } from "react-query";
import { Skeleton } from "antd";
import Body from "./Body/Body";

const Profile = () => {
  const { username } = useParams();

  const { isLoading, error, data } = useQuery("insta-user", () =>
    API.get(`/auth/user/${username}`)
  );
  //console.log(data.data);

  if (isLoading) {
    // use antd to show skeleton
    return <Skeleton avatar paragraph={{ rows: 20 }} />;
  }

  if (error) console.log(error);

  return (
    <div>
      <Body
        user={data.data.user}
        postCount={data.data.posts.length}
        posts={data.data.posts}
      />
    </div>
  );
};

export default Profile;
