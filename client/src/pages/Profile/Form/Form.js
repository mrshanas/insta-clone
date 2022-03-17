import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { useMutation } from "react-query";
import API from "../../../api";

const Form = () => {
  const [post, setPost] = useState({ caption: "", photo: "" });

  const mutation = useMutation((newPost) => API.post("/create_post", newPost));

  const onDone = ({ base64 }) =>
    setPost((prev) => ({ ...prev, photo: base64 }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // posting request to the server
    mutation.mutate(post);
    console.log(mutation);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        autoComplete="off"
        value={post.caption}
        name="caption"
        placeholder="Caption your post"
        onChange={handleChange}
      />{" "}
      <FileBase64 multiple={false} onDone={onDone} type="file" />
      <input type="submit" value="Post" />
    </form>
  );
};

export default Form;
