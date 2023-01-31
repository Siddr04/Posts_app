// import logo from './logo.svg';
import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes ,Link} from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/createPost">New Post</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/createPost" element={<CreatePost />} exact />
          <Route path="/login" element={<Login/>} exact />
          <Route path="/signup" element={<SignUp />} exact />
          <Route path="/post/:id" element={<Post/>} exact />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
