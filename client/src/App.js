// import logo from './logo.svg';
import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes ,Link} from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import CreatePost from "./pages/CreatePost";
function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
        <Link to="/createPost">Post Something !!</Link>
        <Link to="/">Home</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/createPost" element={<CreatePost />} exact />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
