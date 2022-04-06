import React, { useState } from "react";
import { Row, Col, Avatar, Divider, Image, Modal } from "antd";
import UploadForm from "../UploadForm/UploadForm";
import Follow from "../Follow/Follow";
import noDp from "../../../assets/images/no-profile-picture.svg";
import "../../../sass/Profile.scss";
import Navbar from "../../../components/Navbar/Navbar";

const Header = ({ user, postCount, posts, decodedToken }) => {
  //console.log(posts);
  const [visible, setVisible] = useState(false);

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Navbar />
        </Col>
        <Col span={8} offset={4}>
          <Avatar src={user.avatar ? user.avatar : noDp} size={150} />
          {/*<img src={user.avatar} alt={user.username} width="100%" />*/}
        </Col>
        <Col span={12}>
          <div className="profile__user">
            <p>{user.username}</p>
            {user._id === decodedToken.id ? (
              <>
                <button>Edit Profile</button>
                <button onClick={() => setVisible(true)}>Add Post</button>
              </>
            ) : (
              <Follow user={user} decodedToken={decodedToken} />
            )}
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
              <span>{postCount} posts</span>{" "}
              <span>{user.followers.length} followers</span>{" "}
              <span>{user.following.length} following</span>
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
