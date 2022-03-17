import React, { useState } from "react";
import { Row, Col, Avatar, Divider, Image, Modal } from "antd";
import "./Body.scss";
import UploadForm from "../UploadForm/UploadForm";

const Header = ({ user, postCount, posts }) => {
  //console.log(posts);
  const [visible, setVisible] = useState(false);
  const closeModal = () => {
    setVisible(false);
  };
  return (
    <>
      <Row>
        <Col span={8} offset={4}>
          <Avatar src={user.avatar} size={150} />
          {/*<img src={user.avatar} alt={user.username} width="100%" />*/}
        </Col>
        <Col span={12}>
          <div className="profile__user">
            <p>{user.username}</p>
            <button>Edit Profile</button>
            <button onClick={() => setVisible(true)}>Add Post</button>
          </div>
          <Modal
            title="Create a new post"
            centered={true}
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={1000}
          >
            <UploadForm closeModal={closeModal} />
          </Modal>
          <div className="profile__about">
            <p>
              <span>{postCount} posts</span> <span>0 followers</span>{" "}
              <span>0 following</span>
            </p>
          </div>
          <div className="profile__bio">
            <p>{user.bio}s</p>
          </div>
        </Col>
        <Divider>Posts</Divider>
        {posts.map((post) => (
          <Col span={6} offset={2} key={post._id}>
            <Image src={post.photo} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Header;
