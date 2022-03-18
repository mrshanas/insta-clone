import React, { useEffect, useState } from "react";
import API from "../../../api";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

const Follow = ({ user, decodedToken }) => {
  const [isFollowed, setisFollowed] = useState(false);
  const { username } = useParams();
  const mutation = useMutation(() => API.post(`/auth/user/${username}`));
  const onClick = () => {
    // api calls to the server
    mutation.mutate();
  };

  useEffect(() => {
    user.followers.includes(decodedToken.id)
      ? setisFollowed(true)
      : setisFollowed(false);
  }, [user.followers, decodedToken]);

  return (
    <button onClick={onClick} type="button">
      {isFollowed ? "Unfollow" : "Follow"}
    </button>
  );
};

export default Follow;
