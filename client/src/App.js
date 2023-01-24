// import logo from './logo.svg';
import React from 'react';
import './App.css';
import {useEffect,useState} from "react";
import axios from 'axios';
function App() {
  const [listofpost,setListofposts]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3024/").then((response)=>{
      // console.log(response);
      setListofposts(response.data);
      console.log(response.data);
    })
  },[])

  return (
    <>
    <div className="App">
      {listofpost.map((post)=>
      <>

        
        
          <div className='post'>
            <div className='title'>{post.title}</div>
            <div className='body'>{post.postText}</div>
            <div className='footer'>{post.username}</div>
          </div>
        
      </> 

      )} 
    </div>
    </>
  );
}

export default App;
