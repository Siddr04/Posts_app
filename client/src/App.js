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
function App() {
  const [AuthState, setAuthState] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem('accessToken'))
    {
      setAuthState(true);
    }
  },[])
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
