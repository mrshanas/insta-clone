import React from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
import { useQuery } from "react-query";
import { Skeleton } from "antd";
import Body from "./Body/Body";
import jwtDecode from "jwt-decode";

const Profile = () => {
  const { username } = useParams();
  let decodedToken;
  if (localStorage.getItem("token")) {
    decodedToken = jwtDecode(localStorage.getItem("token"));
  }
  const { isLoading, error, data } = useQuery("insta-user", () =>
    API.get(`/auth/user/${username}`)
  );

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
        decodedToken={decodedToken}
      />
    </div>
  );
};

export default Profile;
