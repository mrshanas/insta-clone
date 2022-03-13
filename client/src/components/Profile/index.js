import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
import { useQuery } from "react-query";
import Form from "./Posts/Form";
import Header from "./Header.js";

const Profile = () => {
  const { username } = useParams();

  const { isLoading, error, data } = useQuery("insta-user", () =>
    API.get(`/auth/user/${username}`)
  );
  //console.log(data);

  if (isLoading) {
    // use antd to show skeleton
    return "Loading";
  }

  if (error) console.log(error);

  return (
    <div>
      <Header user={data.data.user} postCount={data.data.posts.length} />
      <Form />
    </div>
  );
};

export default Profile;
