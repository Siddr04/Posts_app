// import logo from './logo.svg';
import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState,useEffect } from "react";
import PageNotFound from "./pages/PageNotFound";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import {AuthContext} from "./helpers/AuthContext";
import axios from "axios";
function App() {
  const [AuthState, setAuthState] = useState(false);
  const [userName, setuserName] = useState("");

  useEffect(()=>{
    axios.get("http://localhost:3024/users/auth",{headers:{
      accessToken:localStorage.getItem("accessToken"),
    },}).then((response)=>{

      if(response.data.error)
      {
        setAuthState(false);
      }
      else
      {
        setuserName(response.data.Username);
        // console.log(response.data);

        setAuthState(true);
      }
    })
  },[])
  
  const logout=(()=>{
    localStorage.removeItem("accessToken");
    setAuthState(false);
  })

  return (
    <div className="App">
      <AuthContext.Provider value={{ AuthState, setAuthState }}>
        <Router>
          <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/createPost">New Post</Link>
            {!AuthState && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">SignUp</Link>
              </>
            )}
            {AuthState && (
              <>
                {userName && <div id='user-id'>Welcome, {userName}</div>}
                <button id="nav-btn" onClick={logout}>Logout</button>

              </>
            )}
          </div>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/createPost" element={<CreatePost />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/signup" element={<SignUp />} exact />
            <Route path="/post/:id" element={<Post />} exact />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
