import React, { useState } from "react";
import { useMutation } from "react-query";
import API from "../../../api";
import { Upload, message, Input, Button } from "antd";

const Form = ({ closeModal }) => {
  const [post, setPost] = useState({ caption: "", photo: "" });
  const [loading, setLoading] = useState(false);
  const { TextArea } = Input;

  const mutation = useMutation((newPost) => API.post("/create_post", newPost));

  // convert the uploaded image to base64
  const getBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader);
    reader.onload = () => {
      setPost((prev) => ({ ...prev, photo: reader.result }));
      setLoading(false);
    };
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    return isJpgOrPng
      ? true
      : message.error("You can only upload png or jpeg file");
  };

  const handleUploadChange = (info) => {
    info.file.status === "uploading" ? setLoading(true) : setLoading(false);
  };
  // overrirde default upload post request
  const customRequest = (req) => {
    //console.log(req);
    req.onSuccess(getBase64(req.file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // posting request to the server
    mutation.mutate(post);
    closeModal();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Upload
          name="avatar"
          maxCount={1}
          listType="picture-card"
          showUploadList={true}
          beforeUpload={beforeUpload}
          onChange={handleUploadChange}
          customRequest={customRequest}
        >
          {<div>{loading ? <p>Loading</p> : <p>Upload</p>}Upload</div>}
        </Upload>
        <TextArea
          rows={6}
          placeholder="Caption"
          name="caption"
          value={post.caption}
          onChange={handleChange}
        />

        <Button type="primary" htmlType="submit">
          Post
        </Button>
      </form>
    </>
  );
};

export default Form;
