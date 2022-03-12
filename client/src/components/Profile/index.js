import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
import { useQuery } from "react-query";

const Profile = () => {
  const { username } = useParams();

  const { isLoading, error, data } = useQuery("insta-user", () =>
    API.get(`/auth/user/${username}`)
  );
  console.log(data.data);

  if (isLoading) {
    return "Loading";
  }

  if (error) return console.log(error);
  return (
    <div>
      Hello world
      <img src={data.data.user.avatar} />
    </div>
  );
};

export default Profile;
