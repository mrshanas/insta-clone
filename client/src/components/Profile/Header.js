import React from "react";
import { Row, Col } from "antd";

const Header = ({ user, postCount }) => {
  //console.log(user);
  return (
    <>
      <Row>
        <Col span={10} offset={2}>
          <img src={user.avatar} alt={user.username} width="100%" />
        </Col>
        <Col span={10} offset={2}>
          <div>
            <h2>
              {user.username}
              <button>Settings</button>
            </h2>
          </div>

          <p>{user.bio}s</p>
          <p>
            <span>{postCount} posts</span> <span>0 followers</span>{" "}
            <span>0 following</span>
          </p>
        </Col>
      </Row>
    </>
  );
};

export default Header;
