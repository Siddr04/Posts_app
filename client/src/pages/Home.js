import React from "react";
// import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [listofpost, setListofposts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3024/").then((response) => {
      // console.log(response);
      setListofposts(response.data);
      // console.log(response.data);
    });
  }, []);

  return (
    <>
      {listofpost.map((post) => (
        <>
          <div className="post" onClick={() => navigate(`/post/${post.id}`)}>
            <div className="title">{post.title}</div>
            <div className="body">{post.postText}</div>
            <div className="footer">{post.username}</div>
          </div>
        </>
      ))}
    </>
  );
};

export default Home;
