import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Post = () => {
  const id = useParams();
  const [postValue, setPostValue] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3024/post", id)
      .then(response => {
        setPostValue(response.data);
      });
  }, []);

  if(!postValue.length) return <div>Loading...</div>

  return (
    <>
      {postValue.map((post) => (
        <div className='post'>
          <div className='title'>{post.title}</div>
          <div className='body'>{post.postText}</div>
          <div className='footer'>{post.username}</div>
        </div>
      ))}
    </>
  );
};

export default Post;
