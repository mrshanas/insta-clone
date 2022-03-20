import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import { useQuery } from "react-query";
import API from "../../api";
import { Spin } from "antd";
import Posts from "./Posts";
import Navbar from "./Navbar";
import Aside from "./Aside";

const Home = () => {
  const { isLoading, error, data } = useQuery("insta-posts", () =>
    API.get("/posts")
  );
  //const navigate = useNavigate();
  // const handleClick = () => {
  //   localStorage.clear();
  //   navigate("/login");
  // };
  error ? console.log(error) : console.log(data);
  return (
    <section className="app__home">
      <Navbar />
      <article>
        {isLoading ? <Spin /> : <Posts posts={data.data.posts} />}
      </article>
      <aside>
        <Aside />
      </aside>
    </section>
  );
};

export default Home;
