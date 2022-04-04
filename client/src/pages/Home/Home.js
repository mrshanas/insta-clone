import React, { useState } from "react";
import { useQuery } from "react-query";
import { Spin, Modal } from "antd";
import API from "../../api";
import Posts from "./Posts/Posts";
import Navbar from "../../components/Navbar/Navbar";
import Aside from "./Aside/Aside";
import Post from "./Posts/Post/Post";
import "../../sass/Home.scss";

const Home = () => {
  const [postID, setPostId] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const openPost = (postId) => {
    setPostId(postId);
    setIsVisible(true);
  };

  const closePost = () => setIsVisible(false);

  const { isLoading, error, data } = useQuery("insta-posts", () =>
    API.get("/posts")
  );

  error ? console.log(error) : console.log("");
  return (
    <section className="app__home">
      <Navbar />
      <article>
        {isLoading ? (
          <Spin />
        ) : (
          <Posts posts={data.data.posts} openPost={openPost} />
        )}
        <Modal
          visible={isVisible}
          onCancel={closePost}
          onOk={closePost}
          width={1000}
          centered
        >
          <Post postID={postID} />
        </Modal>
      </article>
      <aside>
        <Aside />
      </aside>
    </section>
  );
};

export default Home;
